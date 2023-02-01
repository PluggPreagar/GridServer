package gridServer;

import com.opencsv.*;
import com.opencsv.exceptions.CsvException;
import org.hsqldb.lib.LineReader;


import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class DataConnector {



    void save(String data) {
        try {
            File file = new File("data/data.csv");
            FileOutputStream stream = new FileOutputStream(file);
            stream.write(data.getBytes(StandardCharsets.UTF_8));
            stream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    void save(byte[] data) {
        try {
            File file = new File("data/data.csv");
            FileOutputStream stream = new FileOutputStream(file);
            stream.write(data);
            stream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    byte[] loadBytes() {
        byte[] bytes = "".getBytes();
        File file = new File("data/data.csv");
        String data = null;
        try {
            data = new String(Files.readAllBytes(Paths.get("data/data.csv")));
            if (null != data) {
                bytes = data.getBytes(StandardCharsets.UTF_8);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytes;

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

