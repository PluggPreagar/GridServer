package gridServer;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

import java.util.List;

class QryLexerTest {

    QryLexer qryLexer = new QryLexer();
    List<QryLexer.Token> token = null;

    String tokenize(String text) {
        token = qryLexer.tokenize(text);
        String toString = token.toString();
        System.out.println( toString);
        return toString;
    }

    @Test
    void tokenize() {
        qryLexer.tokenize("");
        token = qryLexer.tokenize("word");
        System.out.println(token.toString());
    }

    @Test
    void parseMulti() {
        assertEquals( "[[0..4] WORD 'word', [4..5] SPACE ' ', [5..6] WORD 'w']", tokenize("word w") );
    }


    @Test
    void parseMultiQuote() {
        // assertEquals( "[[0..4] WORD 'word', [4..5] QUOTE ''', [5..6] WORD 'w', [6..7] QUOTE ''']", parse("word'w'"));
        assertEquals("[[0..4] WORD 'word', [4..7] WORD_QUOTE1 ''w'']", tokenize("word'w'"));
    }

    @Test
    void parseBlock() {
        assertEquals( "[[0..4] WORD 'word', [4..5] OPERATION '+', [5..6] BLOCK_ELEM '[', [6..7] WORD 'w', [7..8] BLOCK_ELEM ']']", tokenize("word+[w]") );
    }

    @Test
    void parseDelim() {
        assertEquals( "[[0..2] WORD 'a9', [2..3] DELIMITER ',', [3..5] WORD 'b9']", tokenize("a9,b9"));
    }

    @Test
    void parseHint() {
        assertEquals( "[[0..2] WORD 'a9', [2..3] SPACE ' ', [3..18] HINT '/*HINT do so */', [18..19] SPACE ' ', [19..21] WORD 'la']", tokenize("a9 /*HINT do so */ la"));
    }


}