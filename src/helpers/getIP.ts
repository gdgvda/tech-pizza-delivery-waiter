import os from 'os';

interface NetworkInterfaceInfo {
    address: string;
    family: string;
    internal: boolean;
}

function getCurrentIP(): string | null {
    const networkInterfaces: NodeJS.Dict<NetworkInterfaceInfo[]> = os.networkInterfaces();
    let ipAddress: string | null = null;

    // Iterate over network interfaces
    for (const interfaceName of Object.keys(networkInterfaces)) {
        const interfaces = networkInterfaces[interfaceName];

        if (interfaces) {
            for (const iface of interfaces) {
                // Skip internal (loopback) and non-IPv4 addresses
                if (iface.internal || iface.family !== 'IPv4') continue;

                // Return the first non-internal IPv4 address found
                ipAddress = iface.address;
                return ipAddress;
            }
        }
    }

    // If no IP address is found, return null
    return ipAddress;
}

// Export the function
export default getCurrentIP;