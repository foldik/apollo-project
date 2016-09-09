package {{root-package}}.logger;

import java.time.LocalDateTime;

public class Logger {

    private final Class clazz;

    public static Logger getLogger(final Class clazz) {
        return new Logger(clazz);
    }

    private Logger(final Class clazz) {
        this.clazz = clazz;
    }

    public void log(Object message) {
        System.out.println(String.join(" ",
                "[" + LocalDateTime.now() + "]",
                "[" + clazz + "]:",
                message.toString()
                ));
    }
}
