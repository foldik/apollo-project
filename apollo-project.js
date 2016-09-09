const fs = require('fs');

exports.apolloProject = function (settings) {

    function createFileFunction(path) {
        return function(file) {
            if (arguments.length === 0) {
                return path;
            } else {
                return {
                    to: function() {
                        return path + '/' + file;
                    }
                }
            }
        }
    }

    function template(templetaName) {
        return function() {
            retunr fs.readFileSync(__dirname + '\\resources\\' + templetaName, 'utf-8');
        }
    }

    var rootPath = createFileFunction(settings.name);
    var packagePath = createFileFunction(rootPath() + '/src/main/java/' + settings.package.replace(new RegExp('[.]', 'g'), '/'));
    var loggerPath = createFileFunction(packagePath() + '/logger');
    var modulePath = createFileFunction(packagePath() + '/module');
    var servicePath = createFileFunction(packagePath() + '/service');
    var resourcesPath = createFileFunction(settings.name + '/src/main/resources');

    var project = {
        'settings': function() { return settings },
        'paths': [rootPath, packagePath, loggerPath, modulePath, servicePath, resourcesPath],
        'files': [
            {
                'template': template('pom.xml'),
                'params': [
                    {'key': 'app', 'value': settings.name},
                    {'key': 'group-id', 'value': settings.groupId},
                    {'key': 'root-package', 'value': settings.package}
                ],
                'path': rootPath('pom.xml').to
            },
            {
                'template': template('App.java'),
                'params': [
                    {'key': 'service-name', 'value': settings.serviceName},
                    {'key': 'method', 'value': settings.method},
                    {'key': 'root-package', 'value': settings.package}
                ],
                'path': packagePath('App.java').to
            },
            {
                'template': template('Logger.java'),
                'params': [
                    {'key': 'root-package', 'value': settings.package}
                ],
                'path': loggerPath('Logger.java').to
            },
            {
                'template': template('Module.java'),
                'params': [
                    {'key': 'service-name', 'value': settings.serviceName},
                    {'key': 'method', 'value': settings.method},
                    {'key': 'root-package', 'value': settings.package}
                ],
                'path': modulePath('Module.java').to
            },
            {
                'template': template('Service.java'),
                'params': [
                    {'key': 'service-name', 'value': settings.serviceName},
                    {'key': 'method', 'value': settings.method},
                    {'key': 'root-package', 'value': settings.package}
                ],
                'path': servicePath(settings.serviceName + 'Service.java').to
            },
            {
                'template': template('service.conf'),
                'params': [
                    {'key': 'port', 'value': settings.port}
                ],
                'path': resourcesPath(settings.method + '.conf').to
            },
        ]
    }

    return project;
}
