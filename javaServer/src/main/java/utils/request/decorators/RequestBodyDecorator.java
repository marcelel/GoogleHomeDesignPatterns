package utils.request.decorators;

import utils.request.RequestBody;

public class RequestBodyDecorator implements RequestBody {
    private RequestBody requestBody;

    public RequestBodyDecorator(RequestBody requestBody) {
        this.requestBody = requestBody;
    }

    @Override
    public String getBody() {
        return requestBody.getBody();
    }
}
