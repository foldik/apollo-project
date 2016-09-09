package {{root-package}}.service;

import {{root-package}}.logger.Logger;
import com.google.gson.Gson;
import com.google.inject.Inject;
import com.spotify.apollo.RequestContext;
import com.spotify.apollo.Response;

import java.time.LocalDateTime;

public class {{service-name}}Service {

    private static final Logger LOGGER = Logger.getLogger({{service-name}}Service.class);
    private static final String SERVICE_NAME = "{{service-name}}";

    private final Gson gson;

    @Inject
    public {{service-name}}Service(Gson gson) {
        this.gson = gson;
    }

    public Response<String> {{method}}(RequestContext requestContext) {
        LOGGER.log("Request arrived");
        return Response.ok().withPayload(gson.toJson("{{service-name}}Service-{{method}}"));
    }
}
