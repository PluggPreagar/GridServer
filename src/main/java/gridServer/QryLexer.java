package gridServer;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class QryLexer {



    public enum TokenDefinition {
        WORD("[a-zA-Z0-9_.-]*[a-zA-Z][a-zA-Z0-9_.-]*"),
        NUMBER("[0-9][0-9,.]*"),
        SPACE("[ \t\n\r]+"),
        HINT("(/\\*\\+?HINT[: ].*?\\*/|#HINT[: ].*$)"),
        DOC("(/\\*\\+?DOC[: ].*?\\*/|#DOC[: ].*$)"),
        COMMENT("(/\\*.*?\\*/|#.*$)"),
        DELIMITER(","),
        OPERATION("[+-]"),
        //BLOCK_ELEM("[\\[\\]]"),
        BLOCK_ELEM_START("\\["),
        BLOCK_ELEM_END("\\]"),
        WORD_QUOTE1("'.*?'"),
        WORD_QUOTE2("\".*?\""),
        QUOTE("[\"']")
        ;

        public final String patternString;
        public final Pattern pattern;
        public Matcher matcher = null;
        public String value;
        public int start;
        public int end;

        TokenDefinition(String patternString) {
            this.patternString = patternString;
            this.pattern = Pattern.compile(patternString);
            start = -1;
        }

    }

    class Token{

        TokenDefinition tokenDefinition;
        int start;
        int end;
        String value;

        Token( TokenDefinition tokenDefinition, String text) {
            this.tokenDefinition = tokenDefinition;
            start = tokenDefinition.start;
            end = tokenDefinition.end;
            value = text.substring( start, end);
        }

        public String toString() {
            return "[" + this.start + ".." + this.end + "] " + tokenDefinition.name() + " '" + this.value + "'";
        }


    }

    public List<Token> tokenize(String text) {
        int c = 0 ;
        int l = text.length();
        TokenDefinition token = TokenDefinition.WORD; // init
        token.end = 0;
        List<Token> tokens = new ArrayList<>();
        for( TokenDefinition t : TokenDefinition.values()) {
            t.matcher = t.pattern.matcher( text );
            t.start = -1; // reset ...
        }

        while ( c < l &&  null != token ) {
            c = token.end;
            token = null;
            for( TokenDefinition t : TokenDefinition.values()) {
                // find next matching pos
                if ( t.start  < c ) {
                    if (t.matcher.find(c)) {
                        t.start = t.matcher.start();
                        t.end = t.matcher.end();
                        if (t.end == t.start) {throw  new RuntimeException( "zero-length " + token.name() );}
                    } else {
                        t.start = l + 1; // move to end ...
                    }
                }
                // should be at least 1 exact match ....
                if ( c == t.start ){
                    if (null == token) { // orderd in prio ... might be changed by backtracing ...
                        token = t;
                        Token clone = new Token( t, text);
                        tokens.add(clone);
                        System.out.println( "[" + c + ".." + t.end + "] found " +  String.format("%-20s", t.name()) + " " + ( 0 == t.start ? "" :  String.format("%" + t.start + "s",".").replace(" ",".")) + "'" + clone.value  + "'" );
                    } else {
                        System.out.println( "[" + c + ".." + t.end + "] found " + t.name()  );
                    }
                }
            } // for token

        } // while ..

        if ( null == token && c < l) {
            System.out.println( c + " unparsable content  \"" + text.substring( c, c + 5 ) + "..." );
        }

        return tokens;
    }


}
