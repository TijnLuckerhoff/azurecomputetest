import { BlobServiceClient } from '@azure/storage-blob';

// In het storage account, ga naar Security + Networking en dan naar Access keys.
// Kopieer de connection string (1 of 2, maakt niet uit) en plak deze hieronder.
const connstr = 'DefaultEndpointsProtocol=https;AccountName=tijn;AccountKey=Ia7LakZlkfTb+pU6wxT0hG/KSk3WgzyKale9vquxGtObq4+8cdu8KLVp00kAPvFSMtfZq7tJD2Ym+AStawjQLg==;EndpointSuffix=core.windows.net';
// deze 2 spreken wel voor zich
const containerName = 'images';
const accountName = 'tijn';

const blobServiceClient = BlobServiceClient.fromConnectionString(connstr);
const containerClient = blobServiceClient.getContainerClient(containerName);

export async function listBlobs() {
  const blobUrls = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blob.name}`;
    blobUrls.push(url);
  }
  return blobUrls;
}