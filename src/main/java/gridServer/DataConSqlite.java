package gridServer;

import java.sql.*;
import java.util.Map;

public class DataConSqlite implements DataConnector{

    String fileName = "test.db";

    @Override
    public boolean matches(String query, Map<String, String> params) {
        return query.matches(".*(synonyme|t1).*");
    }

    @Override
    public String run(String query, Map<String, String> params) {

        String id = params.get("id");
        if (null != id && id.matches("[0-9]+,[0-9]+") && params.containsKey("val")) {
            // UPDATE
            String[] i = id.split(",");
            update( query, params.get("val"), Integer.valueOf(i[0]), Integer.valueOf(i[1]));
        }

        String data = read( query, params );
        return data;
    }


    public String update(String qry, String val,int row, int col) {
        String data = null;
        String url = "jdbc:sqlite:./data/" + fileName;
        String sql = "";

        try (Connection conn = DriverManager.getConnection(url)) {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();

                Statement stmt = conn.createStatement();

                /* get column-name ... for col */
                ResultSet rs = stmt.executeQuery( expand(qry, null));
                String columnId = rs.getMetaData().getColumnName( 1 );
                String columnName = rs.getMetaData().getColumnName( col+1 );

                sql = "update " + qry + " set " + columnName + " = \"" + val + "\" where " + columnId + " =\"" + row + "\"";
                stmt.executeUpdate( sql);
                conn.close();
            }

        } catch (SQLException e) {
            System.out.println(sql);
            System.out.println(e.getMessage());
        }
        return data;
    }



    public String read(String query, Map<String, String> params) {
        String data = null;
        String url = "jdbc:sqlite:./data/" + fileName;
        try {
            Class.forName("org.sqlite.JDBC");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try (Connection conn = DriverManager.getConnection(url)) {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("The driver name is " + meta.getDriverName());
                System.out.println("A new database has been created.");

                Statement stmt = conn.createStatement();;
                String sql = expand( query, params);
                data = "";
                //stmt.executeUpdate(sql)
                ResultSet rs = stmt.executeQuery(sql);
                int colCount = rs.getMetaData().getColumnCount();
                for (int i = 1; i <= colCount ; i++) {
                    data += rs.getMetaData().getCatalogName(i)+ ";";
                }
                data += System.lineSeparator();
                while(rs.next()) {
                    for (int i = 1; i <= colCount ; i++) {
                        data += rs.getString(i)+ ";";
                    }
                    data += System.lineSeparator();
                }
                conn.close();
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return data;
    }

    String  expand(String query, Map<String, String> params) {
        return "select * from " + query;
    }


}
