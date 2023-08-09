import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TasksDashboardWebPartStrings';
import TasksDashboard from './components/TasksDashboard';
import { ITasksDashboardWebPartProps } from './interfaces/ITasksDashboardWebPartProps';
import { getSP } from "../../pnpjs-config";

export default class TasksDashboardWebPart extends BaseClientSideWebPart<ITasksDashboardWebPartProps> {

  public render(): void {
    ReactDom.render(React.createElement(TasksDashboard, this.properties), this.domElement);
  }

  protected onInit(): Promise<void> {
    // Initialize our _sp object that we can then use in other packages without having to pass around the context.
    // Check out pnpjsConfig.ts for an example of a project setup file.
    getSP(this.context);
    return super.onInit();
  };

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
