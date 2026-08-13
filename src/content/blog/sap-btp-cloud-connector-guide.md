---
title: "SAP BTP Cloud Connector – How to Connect On-Premise Systems to Cloud"
description: "Learn how SAP Cloud Connector works, how to set it up, and how to securely connect your on-premise SAP systems to SAP BTP cloud services."
pubDate: "2026-07-25"
category: "SAP BTP"
author: "Daksh"
image: "/sap-btp-cloud-connector-thumbnail.png"
readingTime: "9 min read"
order: 53
keywords:
  - "sap cloud connector"
  - "sap btp cloud connector"
  - "sap btp on premise connection"
  - "cloud connector setup"
  - "sap btp destination"
  - "sap cloud connector tutorial"
  - "sap hybrid landscape"
  - "sap btp connectivity"
  - "sap cloud to on premise"
  - "sap btp architecture"
---

When companies start using SAP BTP, the first question that comes up is — how do we connect our cloud applications to the on-premise SAP system sitting in our data center? The S/4HANA system, the ECC system, the BW system — all of them are running on-premise behind firewalls. BTP applications running in the cloud cannot directly talk to these systems because of network security restrictions.

This is the exact problem SAP Cloud Connector solves. It creates a secure tunnel between your on-premise network and SAP BTP cloud. Think of it like a VPN, but purpose-built for SAP. Your cloud applications send a request to BTP, BTP forwards it through the Cloud Connector tunnel, the Cloud Connector fetches the data from the on-premise system, and sends it back through the same secure tunnel.

The beauty of this setup is that you do not need to open any inbound ports in your corporate firewall. The Cloud Connector initiates the connection from inside your network to the cloud — not the other way around. Your security team will love this because the corporate network remains fully protected.

---

## Why Do You Need Cloud Connector?

Without Cloud Connector, your options for connecting cloud to on-premise are limited and risky:

**Option 1: Open Firewall Ports** — You could open inbound ports in your firewall to allow cloud applications to directly call your on-premise system. But this is a massive security risk. Opening ports exposes your internal SAP system to the internet.

**Option 2: VPN Tunnel** — You could set up a traditional VPN between BTP and your data center. But VPNs are expensive, complex to manage, and often have performance issues.

**Option 3: Cloud Connector (Recommended)** — A lightweight agent installed on-premise that creates a secure, managed tunnel to BTP. No firewall changes needed, no VPN costs, and full control over which systems and APIs are accessible.

---

## How Cloud Connector Works — The Architecture

The architecture is straightforward:

```text
[SAP BTP Cloud]                          [Your Data Center]
     |                                         |
     |         Secure TLS Tunnel               |
  [BTP Connectivity Service] <=======> [Cloud Connector]
     |                                         |
     |                                    [S/4HANA]
     |                                    [ECC System]
     |                                    [BW System]
```

Here is the flow step by step:

1. **Cloud Connector Installation**: You install the Cloud Connector software on a machine inside your corporate network. It is a lightweight Java application that runs on Windows or Linux.

2. **Outbound Connection**: The Cloud Connector initiates an outbound TLS (encrypted) connection to SAP BTP's Connectivity Service. Since it is outbound, no firewall changes are needed.

3. **System Registration**: In the Cloud Connector admin panel, you register which on-premise systems should be accessible from the cloud. You specify the host, port, and which URL paths are allowed.

4. **BTP Destination**: On the BTP side, you create a Destination that points to the on-premise system through the Cloud Connector. Your cloud applications use this Destination to make API calls.

5. **Request Flow**: When a BTP application needs data from S/4HANA, it calls the Destination. BTP routes the request through the tunnel to the Cloud Connector, which forwards it to the S/4HANA system and returns the response.

---

## Installing Cloud Connector — Step by Step

### Prerequisites
- A machine inside your corporate network (Windows Server or Linux)
- Java Runtime Environment (JRE) 8 or higher
- Network access to your on-premise SAP systems
- An SAP BTP subaccount with Connectivity service enabled

### Step 1: Download Cloud Connector
Go to [SAP Development Tools](https://tools.hana.ondemand.com/#cloud) and download the Cloud Connector installer for your operating system.

### Step 2: Install and Start
On Windows, run the installer. On Linux, extract the archive and run the startup script. The Cloud Connector starts a local web administration interface on port 8443.

### Step 3: Access Admin Panel
Open your browser and go to `https://localhost:8443`. Log in with the default credentials (Administrator / manage). Change the password immediately.

### Step 4: Connect to BTP Subaccount
In the admin panel, click "Define Subaccount" and enter your BTP subaccount details — region, subaccount ID, and your BTP user credentials. The Cloud Connector establishes the tunnel.

### Step 5: Add On-Premise System Mapping
Click "Cloud to On-Premise" and add a system mapping:

| Field | Value |
| :--- | :--- |
| **Backend Type** | SAP System (or Non-SAP System) |
| **Protocol** | HTTPS (or HTTP) |
| **Internal Host** | Your S/4HANA hostname (e.g., s4hana.company.local) |
| **Internal Port** | 443 (or 8000 for HTTP) |
| **Virtual Host** | A virtual name visible to cloud apps (e.g., s4hana-virtual) |
| **Virtual Port** | 443 |

### Step 6: Define Accessible Resources
Under the system mapping, add the URL paths that cloud apps are allowed to access:

| URL Path | Access Policy |
| :--- | :--- |
| `/sap/opu/odata/` | Path and All Sub-Paths |
| `/sap/bc/` | Path and All Sub-Paths |

This means only OData and BC services are accessible from the cloud. Everything else remains blocked. This is the principle of least privilege — you expose only what is needed.

---

## Creating a BTP Destination

After the Cloud Connector is set up, you need to create a Destination in your BTP subaccount so that cloud applications can use it.

### Step 1: Open BTP Cockpit
Go to your BTP subaccount → Connectivity → Destinations → New Destination.

### Step 2: Configure the Destination

| Property | Value |
| :--- | :--- |
| **Name** | S4HANA_ONPREM |
| **Type** | HTTP |
| **URL** | `http://s4hana-virtual:443` (the virtual host from Cloud Connector) |
| **Proxy Type** | OnPremise |
| **Authentication** | BasicAuthentication |
| **User** | Your S/4HANA service user |
| **Password** | Service user password |

### Step 3: Test the Connection
Click "Check Connection". If everything is configured correctly, you will see a green success message.

Now any BTP application (CAP, Build Apps, Integration Suite) can use the `S4HANA_ONPREM` destination to call on-premise APIs through the secure tunnel.

---

## High Availability Setup

In production environments, a single Cloud Connector is a single point of failure. If it goes down, all cloud-to-on-premise communication stops.

SAP recommends a High Availability (HA) setup with two Cloud Connector instances:

- **Master Instance**: The primary Cloud Connector that handles all traffic
- **Shadow Instance**: A standby that monitors the master. If the master goes down, the shadow automatically takes over within seconds.

Both instances connect to the same BTP subaccount. The failover is automatic — no manual intervention needed.

---

## Security Best Practices

### 1. Principle of Least Privilege
Only expose the specific URL paths that your cloud applications need. Never expose the entire on-premise system with a wildcard path like `/`.

### 2. Use HTTPS Everywhere
Configure HTTPS for both the cloud-to-Cloud Connector tunnel and the Cloud Connector-to-on-premise system connection.

### 3. Dedicated Service User
Create a dedicated technical user in your S/4HANA system for cloud connectivity. Do not use a personal user account or a user with broad authorizations.

### 4. Regular Certificate Rotation
The TLS certificates used by Cloud Connector should be rotated regularly according to your company's security policy.

### 5. Audit Logging
Enable audit logging in the Cloud Connector admin panel. This records every connection attempt, which is essential for security monitoring and compliance.

---

## Cloud Connector vs API Management vs Integration Suite

| Feature | Cloud Connector | API Management | Integration Suite |
| :--- | :--- | :--- | :--- |
| **Primary Purpose** | Secure tunnel to on-premise | API gateway and throttling | Data transformation and routing |
| **Direction** | Cloud ↔ On-premise | Cloud ↔ External APIs | Any ↔ Any |
| **Transformation** | None (pass-through) | Rate limiting, caching | Full data mapping and conversion |
| **Use Case** | Connect BTP apps to S/4HANA | Expose APIs to partners | Complex multi-system integration |

Cloud Connector is not a replacement for API Management or Integration Suite. It is the foundation layer that provides connectivity. The other tools build on top of it.

---

## Common Mistakes to Avoid

### 1. Exposing Too Many Resources
New administrators often expose all URL paths with a wildcard. This defeats the purpose of the security model. Always specify exact paths.

### 2. Running Cloud Connector on the SAP Application Server
Do not install Cloud Connector on the same machine as your S/4HANA system. Use a separate dedicated machine. If the Cloud Connector has a security issue, it should not directly compromise your SAP system.

### 3. Forgetting High Availability
A single Cloud Connector instance is fine for development and testing. For production, always set up a master-shadow HA pair.

### 4. Not Monitoring the Tunnel
The tunnel can drop due to network issues. Set up monitoring alerts for Cloud Connector health. The admin panel provides status APIs that can be integrated with monitoring tools.

---

## Interactive Checkpoints

<details>
<summary>🙋‍♂️ <strong>Checkpoint 1:</strong> Why does Cloud Connector not require inbound firewall port changes?</summary>
<div class="details-content">
Cloud Connector initiates the connection from inside the corporate network to SAP BTP cloud — it is an outbound connection. Corporate firewalls typically allow outbound HTTPS connections (port 443). Since no inbound connection is needed, no firewall ports need to be opened. This is a deliberate security design choice by SAP that makes Cloud Connector much safer than alternatives like opening firewall ports or setting up VPN tunnels.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 2:</strong> What is the difference between Virtual Host and Internal Host in Cloud Connector?</summary>
<div class="details-content">
Internal Host is the real hostname of your on-premise SAP system inside your network (e.g., s4hana.company.local). Virtual Host is a fake name that you assign for cloud applications to use. Cloud apps never see the real internal hostname — they only see the virtual name. This adds a layer of security because even if someone inspects the cloud application configuration, they cannot determine the actual internal network address of your SAP system.
</div>
</details>

<details>
<summary>🙋‍♂️ <strong>Checkpoint 3:</strong> When should you set up a High Availability (HA) configuration?</summary>
<div class="details-content">
You should set up HA for any production environment where cloud-to-on-premise connectivity is business-critical. If the Cloud Connector goes down and your BTP applications cannot reach the on-premise SAP system, business processes will stop. The HA setup with a master and shadow instance ensures automatic failover within seconds. For development and testing landscapes, a single instance is usually sufficient.
</div>
</details>

---

## Summary

SAP Cloud Connector is the essential bridge between your on-premise SAP landscape and SAP BTP cloud services. It provides a secure, firewall-friendly, and manageable way to expose on-premise systems to cloud applications without compromising network security.

Every SAP BTP project that involves on-premise systems needs Cloud Connector. Whether you are building CAP applications, using Integration Suite, or connecting Build Apps to S/4HANA — the Cloud Connector is the foundation that makes it all possible. Understanding how to install, configure, and secure it is a must-have skill for any SAP BTP consultant or developer.
