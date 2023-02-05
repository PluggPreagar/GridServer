package gridServer;

import java.util.Map;

public interface DataConnector {

    boolean matches(String query, Map<String, String> params);

    String run(String qry, Map<String, String> params);
}
