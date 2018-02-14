package utils.request;

public class PlainRequestBody implements RequestBody {
    private String body;

    public PlainRequestBody(String body) {
        this.body = body;
    }

    @Override
    public String getBody() {
        return body;
    }
}
