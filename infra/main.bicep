// Komatsu Ontology Workbench — Azure resources for one resource group.
//
//   az deployment group create -g <your-rg> -f infra/main.bicep -p infra/main.parameters.json
//
// Creates the Static Web App that hosts the workbench (plus its managed
// Functions API in /api) and, optionally, a Fabric capacity for Fabric IQ.

targetScope = 'resourceGroup'

@description('Prefix for resource names, e.g. kau-ontology')
param namePrefix string = 'kau-ontology'

@description('Static Web Apps is not offered in Australian regions; East Asia is the closest.')
@allowed([
  'eastasia'
  'westeurope'
  'eastus2'
  'centralus'
  'westus2'
])
param swaLocation string = 'eastasia'

@description('Standard is required for Entra ID (custom auth) sign-in and private endpoints.')
@allowed([
  'Free'
  'Standard'
])
param swaSku string = 'Standard'

@description('Create a new Fabric capacity. Leave false to use an existing capacity.')
param deployFabricCapacity bool = false

param fabricLocation string = 'australiaeast'

@allowed([
  'F2'
  'F4'
  'F8'
  'F16'
  'F32'
  'F64'
])
param fabricSku string = 'F2'

@description('Capacity administrators (UPNs or service principal object IDs).')
param fabricAdmins array = []

param tags object = {
  app: 'komatsu-ontology-workbench'
  costCentre: 'TBC'
}

resource swa 'Microsoft.Web/staticSites@2023-12-01' = {
  name: '${namePrefix}-swa'
  location: swaLocation
  tags: tags
  sku: {
    name: swaSku
    tier: swaSku
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    buildProperties: {
      // Deployments come from .github/workflows/deploy-azure-swa.yml
      skipGithubActionWorkflowGeneration: true
    }
  }
}

// Fabric capacity names: lowercase letters and digits only
resource fabricCapacity 'Microsoft.Fabric/capacities@2023-11-01' = if (deployFabricCapacity) {
  name: toLower(replace('${namePrefix}fabric', '-', ''))
  location: fabricLocation
  tags: tags
  sku: {
    name: fabricSku
    tier: 'Fabric'
  }
  properties: {
    administration: {
      members: fabricAdmins
    }
  }
}

output staticWebAppName string = swa.name
output staticWebAppHostname string = swa.properties.defaultHostname
output fabricCapacityName string = deployFabricCapacity ? fabricCapacity.name : ''
