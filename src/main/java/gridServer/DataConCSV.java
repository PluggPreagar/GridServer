package gridServer;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVWriterBuilder;
import com.opencsv.ICSVWriter;
import com.opencsv.exceptions.CsvException;
import org.hsqldb.lib.LineReader;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class DataConCSV implements DataConnector{
    @Override
    public boolean matches(String query, Map<String, String> params) {
        return query.matches(".*\\.csv\\b");
    }

    @Override
    public String run(String qry, Map<String, String> params) {
        String fileName = qry;
        String id = params.get("id");
        if (null != id && id.matches("[0-9]+,[0-9]+") && params.containsKey("val")) {
            // UPDATE
            String[] i = id.split(",");
            updateCSV( fileName, params.get("val"), Integer.valueOf(i[0]), Integer.valueOf(i[1]));

        }
        String data = load(fileName);
        return data;
    }


    String load(String fileName) {
        StringBuffer data = new StringBuffer();
        if (fileName.matches("[a-zA-Z0-9_.-]+")) {

            File file = new File("data/" + fileName + (fileName.contains(".") ? "" : ".csv"));
            try (FileInputStream reader = new FileInputStream(file)) {
                LineReader lineReader = new LineReader(reader, "UTF-8");
                while (true) {
                    String line = lineReader.readLine();
                    if (null == line) break;
                    //
                    data.append(line + System.lineSeparator());
                    // log
                    line = line.substring(1, line.length() - 1); // cut away "
                    String[] vals = line.split("\";\""); //CSV.split(line);
                    for (String val : vals) {
                        System.out.print(val + " <<>> ");
                    }
                    System.out.println();
                }
                lineReader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return data.toString();
    }


    public static void updateCSV(String fileName, String replace,
                                 int row, int col)  {

        if (fileName.matches("[a-zA-Z0-9_.-]+")) {
            fileName = "data/" + fileName + (fileName.contains(".") ? "" : ".csv");

            // Read existing file
            CSVReader reader = null;
            try {
                reader = new CSVReaderBuilder(new FileReader(fileName)).build();
                List<String[]> csvBody = reader.readAll();
                // get CSV row column  and replace with by using row and column
                csvBody.get(row)[col] = replace;
                reader.close();

                // Write to CSV file which is open
                ICSVWriter writer = new CSVWriterBuilder(new FileWriter(fileName)).build();
                writer.writeAll(csvBody);
                writer.flush();
                writer.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (CsvException e) {
                e.printStackTrace();
            }
        }
    }
}
