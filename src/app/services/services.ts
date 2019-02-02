import { DmnXmlService } from "./dmnXmlService";
import { TestDecisionService } from "./testDecisionService";
import { TestSuiteService } from "./testSuiteService";
import { OpenApiDefinitionService } from './openApiDefinitionService';
import { DataModelService } from './dataModelService';
import { SessionDataService } from './sessionDataService';
import { EventService } from './eventService';
import { FileService } from './fileService';
import { DmnProjectService } from './dmnProjectService';
import { DeploymentService } from './deploymentService';
import { DmnModelService } from './dmnModelService';
import { PluginRegistryService } from './pluginRegistryService';
import { AppConfigurationService } from './appConfigurationService';

export const ALL_SERVICES = [
    DmnXmlService,
    EventService,
    TestDecisionService,
    TestSuiteService,
    OpenApiDefinitionService,
    DataModelService,
    SessionDataService,
    FileService,
    DmnProjectService,
    DeploymentService,
    DmnModelService,
    PluginRegistryService,
    AppConfigurationService,
];
