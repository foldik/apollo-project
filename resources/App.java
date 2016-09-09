package {{root-package}};

import {{root-package}}.module.Module;
import {{root-package}}.service.{{service-name}}Service;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.spotify.apollo.Environment;
import com.spotify.apollo.httpservice.HttpService;
import com.spotify.apollo.httpservice.LoadingException;
import com.spotify.apollo.route.Route;

public class App {

    public static void main(String[] args) throws LoadingException {
        HttpService.boot(App::init, "{{method}}", args);
    }

    static void init(Environment environment) {
        Injector injector = Guice.createInjector(new Module());
        {{service-name}}Service service = injector.getInstance({{service-name}}Service.class);

        environment.routingEngine().registerAutoRoute(Route.sync("GET", "/{{method}}", service::{{method}}));
    }
}
