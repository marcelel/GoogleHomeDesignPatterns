package application.model;

public class ConnectionInfo {
    private static String speakerIP;
    private static String contentType = "application/json";

    public static String getSpeakerIP() {
        return speakerIP;
    }

    public static void setSpeakerIP(String speakerIP) {
        ConnectionInfo.speakerIP = speakerIP;
    }

    public static String getContentType() {
        return contentType;
    }

    public static void setContentType(String contentType) {
        ConnectionInfo.contentType = contentType;
    }
}
