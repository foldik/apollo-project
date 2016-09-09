package {{root-package}}.module;

import {{root-package}}.service.{{service-name}}Service;
import com.google.gson.Gson;
import com.google.inject.AbstractModule;

public class Module extends AbstractModule {

    @Override
    protected void configure() {
        bind({{service-name}}Service.class);
        bind(Gson.class);
    }
}
