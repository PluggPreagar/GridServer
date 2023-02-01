package gridServer;


import org.rapidoid.http.Req;
import org.rapidoid.http.ReqHandler;
import org.rapidoid.http.ReqRespHandler;
import org.rapidoid.http.Resp;
import org.rapidoid.http.impl.RespImpl;
import org.rapidoid.setup.On;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Map;
import java.util.logging.Logger;

import static java.lang.Thread.sleep;

public class main {

    /*


        https://www.w3schools.com/howto/howto_js_toggle_like.asp   - toggle by keeping default ...
        https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp

        https://www.w3schools.com/howto/howto_js_treeview.asp

        msg             https://www.w3schools.com/howto/howto_js_callout.asp
                        https://www.w3schools.com/howto/howto_js_snackbar.asp


        https://www.w3schools.com/howto/howto_css_zoom_hover.asp
        https://www.w3schools.com/howto/howto_css_flip_box.asp

        center        https://www.w3schools.com/howto/howto_css_center-vertical.asp


        buttons         https://www.w3schools.com/howto/howto_css_pill_button.asp
                        https://www.w3schools.com/howto/howto_css_notification_button.asp
                        https://www.w3schools.com/howto/howto_css_icon_buttons.asp

        window - look
        https://www.w3schools.com/howto/howto_css_browser_window.asp
        https://www.w3schools.com/howto/howto_css_chat.asp

        icon-bar ...
        https://www.w3schools.com/howto/howto_css_icon_bar.asp
        https://www.w3schools.com/howto/howto_css_navbar_icon.asp

        tabs        https://www.w3schools.com/howto/howto_js_tabs.asp

        drowpdowns...   https://www.w3schools.com/howto/howto_css_dropdown.asp
                        https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_cascading_dropdown
                        https://www.w3schools.com/howto/howto_css_button_split.asp

        drag        https://www.w3schools.com/howto/howto_js_draggable.asp

        slides...   https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp
                    https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp

        syntax highlight        https://www.w3schools.com/howto/howto_syntax_highlight.asp

        charts      https://www.w3schools.com/howto/howto_google_charts.asp

        symbols ... https://www.w3schools.com/howto/howto_css_arrows.asp
                    https://www.w3schools.com/howto/howto_css_shapes.asp
                    https://www.w3schools.com/howto/howto_css_loading_buttons.asp
                    https://www.w3schools.com/howto/howto_css_download_button.asp
                    https://www.w3schools.com/howto/howto_css_custom_checkbox.asp

        grid        https://www.w3schools.com/howto/howto_css_pagination.asp
                    https://www.w3schools.com/howto/howto_css_next_prev.asp
                    https://www.w3schools.com/howto/howto_css_breadcrumbs.asp

        https://www.w3schools.com/howto/howto_html_favicon.asp

     */

    public static String getData(Req req){
        int size1 = 10;
        int size2 = 50;
        String size = req.params().isEmpty() ? null : req.param("size");
        System.out.println( (new Date()).toString() + " getData ... for " + (null == size ? "<null>": size) );
        if (null != size && !size.isEmpty()){
            // size = size.replace("+"," "); // js searchparam change " " to "+"
            String[] sizes = size.split("\\s*[ x]\\s*");
            if (2 == sizes.length && sizes[0].matches("[0-9]+") && sizes[1].matches("[0-9]+")) {
                size1 = Integer.valueOf(sizes[0]);
                size2 = Integer.valueOf(sizes[1]);
            }
        }
        return getData( size1, size2);
    }


    public static String getData(int size1, int size2){
        int l = (new Date()).hashCode();
        System.out.println( (new Date()).toString() + " getData ... " + l );
        StringBuffer data = new StringBuffer();
        for (int i = 0; i < size2 ; i++) {
            for (int j = 0; j < size1 ; j++) {
                if ( 0 != j ) data.append(";");
                if ( 0 == i || 0 == j) {
                    data.append( i + j );
                } else {
                    data.append(  BigInteger.valueOf(l + i+j).hashCode() );
                }
            }
            data.append("\n");
        }
        System.out.println( (new Date()).toString() + " getData DONE " );
        return data.toString();
    }



    static String data2Result(String data){
        // data may not contain line-breaks and "
        String json = data;
        json = json.replace("\\","\\\\");
        json = json.replace( System.lineSeparator(),"\\n");
        json = json.replace( "\n","\\n");
        json = json.replace( "\"","\\\"");
        json = "{  \"data\": \"" +  json + "\"}";
        return json;
    }





    public static void main(String[] arg) {

        // https://replit.com/@preisfrieden/jsGrdi1

        // files from  static/ is loadadble by default ..!
        // http://localhost:8080/index.html

        // http://localhost:8080/size

        System.out.println("start with http://localhost:8080/index.html");
        System.out.println("start with http://localhost:8080/index.html");
        System.out.println("-------------------------------------------");
        //On.get("/size").json("helloWorld"); // .json((String msg) -> msg.length());
        //On.get("/size").json("helloWorld2");
        //On.get("/size").plain("helloWorld2");
        //On.get("").(


        /*

            ways ...

            -   {... -> json, data in data-Attribute
            -   "... -> csv mit ";" delimiter
            -   sonst -> csv mit ";" delimiter




         */




        On.get("/size").plain(
                new ReqRespHandler() {
                    @Override
                    public Object execute(Req req,Resp resp) throws Exception {
                        //return "helloWorld3";
                        //Resp resp = new Resp;
                        // https://github.com/rapidoid/rapidoid/issues/98
                        resp.headers().put("Access-Control-Allow-Origin", "*");
                        return getData(req);
                    }
                }

        );

        On.get("/query").plain(
                new ReqRespHandler() {
                    @Override
                    public Object execute(Req req,Resp resp) throws Exception {
                        //return "helloWorld3";
                        //Resp resp = new Resp;
                        // https://github.com/rapidoid/rapidoid/issues/98
                        resp.headers().put("Access-Control-Allow-Origin", "*");
                        String data = "";
                        Map<String, String> params = req.params();
                        if (params.containsKey("qry2")) {

                        } else if (params.containsKey("qry")) {

                            String qry = req.param("qry");
                            data = new DataConnector().load(qry);

                            String id = params.get("id");
                            if (null != id && id.matches("[0-9]+,[0-9]+") && params.containsKey("val")) {
                                String[] i = id.split(",");
                                new DataConnector().updateCSV( qry, params.get("val"), Integer.valueOf(i[0]), Integer.valueOf(i[1]));
                            }

                        } else {
                            data = getData(5, 5); // getData( req);

                        }

                        return data2Result( data );
                    }
                }

        );


        On.get("/csv").plain(
                new ReqRespHandler() {
                    @Override
                    public Object execute(Req req,Resp resp) throws Exception {
                        //return "helloWorld3";
                        //Resp resp = new Resp;
                        // https://github.com/rapidoid/rapidoid/issues/98
                        resp.headers().put("Access-Control-Allow-Origin", "*");
                        DataConnector connector = new DataConnector();
                        //connector.save( req.body() );
                        //return getData(req);
                        //return connector.load();
                        return data2Result(connector.load("data"));
                    }
                }

        );

        On.get("/info").plain(
                new ReqRespHandler() {
                    @Override
                    public Object execute(Req req,Resp resp) throws Exception {
                        //return "helloWorld3";
                        //Resp resp = new Resp;
                        // https://github.com/rapidoid/rapidoid/issues/98
                        resp.headers().put("Access-Control-Allow-Origin", "*");
                        //connector.save( req.body() );
                        //return getData(req);
                        //return connector.load();
                        return DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss").format(LocalDateTime.now());
                    }
                }

        );


        On.get("/i").html(new ReqRespHandler() {
            @Override
            public Object execute(Req req, Resp resp) throws Exception {
                resp.filename("index.html");
                return null;
            }
        });

        DataConnector connector = new DataConnector();
        //connector.save();
        connector.load("data");
        //System.out.println("..DONE !!");
    }
}