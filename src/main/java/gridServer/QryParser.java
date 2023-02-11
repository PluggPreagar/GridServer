package gridServer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QryParser {

    protected  List<QryLexer.Token> qryTokens;


    class Block{

        public List<Block> blocks  = new ArrayList<>();
        public List<QryLexer.Token> tokens = new ArrayList<>();
        public Parser parser = null;
        public String identifier = null;
        public Map<String,Block> childIdentifier = new HashMap<>();

        void add( Block block ) {
            if ( null != block ) {
                blocks.add( block);
            }
        }

        void shift_token( /* List<QryLexer.Token> tokens */ ){
            // extract first token from list and
            this.tokens.add(qryTokens.remove(0));
        }

        public String toString() {
            return toString("");
        }

        public String toString(String indent) {
            StringBuilder str = new StringBuilder();
            str.append( indent +  ( null != identifier ? identifier : "" )  + " " + parser.getClass().getSimpleName().replace("Parser","") );
            for( QryLexer.Token token : tokens) {
                str.append( " \"" + token.value + "\"");
            }
            str.append( System.lineSeparator() );
            for (Block block : blocks) {
                str.append( block.toString( indent + "\t" ));
            }
            return str.toString();
        }

    }


    class ExecStm{

    }


    class Parser{
        QryLexer.TokenDefinition td;
        Block block = new Block();


        Block getReturn(){
            block.parser = this;
            return block.tokens.isEmpty() && block.blocks.isEmpty() ? null : block;
        }

        void tokenShift() {
            block.tokens.add( qryTokens.remove(0));
        }

        Block parse( ){
            return null;
        };

        void call( Parser parser) {
            block.blocks.add( parser.parse());
        }

        void debug(String action, String msg){
            QryLexer.Token token = qryTokens.isEmpty() ? null : qryTokens.get(0);
            System.out.println(String.format("%-10s %-25s", action ,msg) + " " + String.format("%-"+ ( null == token ? 1 : token.start + 1) +"s"," ").replace(" ",".") + ( null == token ? "" : token.value));
        }

        void call( Parser parser, String comment) {
            debug("", comment + " " + Parser.class.getSimpleName());
            Block child = parser.parse();
            if (null != child) {
                child.identifier = comment;
                this.block.childIdentifier.put( comment, child);
                this.block.blocks.add( child );
            } else {
                System.out.println("     ---- no block created ");
            }
        }

        boolean isNext( QryLexer.TokenDefinition tdDef, boolean remove) {
            debug( "check" , tdDef.name() );
            boolean equals = !qryTokens.isEmpty() && tdDef.equals(qryTokens.get(0).tokenDefinition);
            if (equals && remove) {
                qryTokens.remove(0);
            }
            return equals;
        }

        boolean isNext( QryLexer.TokenDefinition tdDef) {
            debug( "check" , tdDef.name() );
            return !qryTokens.isEmpty() && tdDef.equals(qryTokens.get(0).tokenDefinition);
        }

        void mustNext(QryLexer.TokenDefinition tdDef, boolean remove) {
            debug( "must" , tdDef.name() );
            if (!isNext( tdDef, remove)){
                System.out.println(" missing expected " + tdDef);
            }
        }

        void mustNext(QryLexer.TokenDefinition tdDef) {
            mustNext( tdDef, false);
        }

    }

    class StmtParser extends Parser{

        Block parse() {
            Block block =  new Block();
            block.parser = this;
            block.add( new SrcParser().parse() );
            return block;
        } // parse
    }

    class SrcParser extends Parser{

        Block parse() {
            if (isNext( td.WORD) ) {
                tokenShift();       // srcTab
                call( new WordParser() , "alias");
                call( new ColsParser() , "srcCol");
                call( new ColsParser() , "trgCol");
                call( new SrcParser(), "trgTab");
            }
            return getReturn();
        } // parse
    }

    class WordParser extends Parser{

        Block parse() {
            if (isNext( td.WORD) ) {
                tokenShift();
            }
            return getReturn();
        } // parse
    }


    class ColsParser extends Parser{

        Block parse() {
            if (isNext( td.BLOCK_ELEM_START)) {
                qryTokens.remove(0);
                while ( isNext( td.WORD )) {
                    tokenShift();
                    if (isNext(td.BLOCK_ELEM_END, true)) break;
                    mustNext( td.DELIMITER, true);
                }
            }
            return getReturn();
        } // parse
    }

    Block parse(List<QryLexer.Token> tokens){
        this.qryTokens = tokens;
        Block block = new StmtParser().parse();
        return block;

    }

}
