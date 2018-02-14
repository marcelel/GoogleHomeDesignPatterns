package application.requests;

import application.model.ConnectionInfo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class RequestsHandler {
    public static void safePOST(String url, String body, String contentType) {
        if(ConnectionInfo.getSpeakerIP() != null && !ConnectionInfo.getSpeakerIP().equals("")) {
            try {
                System.out.println(RequestsHandler.POST(
                        ConnectionInfo.getSpeakerIP(),
                        body,
                        ConnectionInfo.getContentType()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Tried to send request with empty server IP");
        }
    }

    public static String POST(String url, String body, String contentType) throws IOException {
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", contentType);

        con.setDoOutput(true);
        OutputStream os = con.getOutputStream();
        os.write(body.getBytes());
        os.flush();
        os.close();

        int responseCode = con.getResponseCode();
        System.out.println("POST Response Code :: " + responseCode);

        BufferedReader in = new BufferedReader(new InputStreamReader(
                con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return response.toString();
    }
}
