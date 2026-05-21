# Hi, I'm Chase (Ced) Dumphord
### Digital Systems Engineer | Infrastructure | Automation | RF Edge Systems

> **Live Portfolio:** https://chasedumphord.com
> **Live NOC Dashboard:** https://noc.chasedumphord.com

---

## About

Digital Systems Engineer with 10+ years of experience across industrial automation, manufacturing systems, and data-driven infrastructure. Currently at GE Aerospace Digital Team specializing in machine data integration, dashboard development, and system-level visibility. Hands-on homelab engineer bridging physical equipment with modern digital platforms. Increasingly integrating AI tooling for system documentation, automated diagnostics, and workflow acceleration.

---

## Live Sites

| Site | URL | Description |
|------|-----|-------------|
| Portfolio | https://chasedumphord.com | Personal portfolio — projects, stack, resume |
| NOC Dashboard | https://noc.chasedumphord.com | Live infrastructure visibility — 28 systems |

---

## Ced's NOC Live Infrastructure Observability

Real-time network operations center dashboard monitoring 28 homelab systems across 6 infrastructure layers.

### How It Works

```
Proxmox Biggie (Cron every 5min)
  → noc_update.py pings 28 systems
  → writes data/noc-status.json
  → git push to ced-portfolio
  → GitHub Pages deploys (~30s)
  → Browser fetches every 30s
  → Live dashboard updates
```

### Systems Monitored

- **6-node Proxmox Cluster** BigWorld, Biggie, Snoop, TooShort, Tupac, DrDre
- **12-node K3s Cluster** 3 control plane (django-1/2/3) + 9 workers (ingress, data, monitoring groups)
- **TrueNAS** Network attached storage
- **Nginx Proxy Manager** Reverse proxy layer
- **Prometheus + Grafana + Uptime Kuma** Full observability stack (Prometheus actively scraping)
- **Dashy + Home Assistant + PrimeStation** Services layer
- **APRS iGate x2** RF edge systems (home + mobile)

### Automation

- Script: `~/scripts/noc_update.py` running on Biggie
- Cron: `*/5 * * * *` — every 5 minutes
- Log: `/var/log/noc_update.log`
- Auth: GitHub Personal Access Token via baked remote URL

---

## Infrastructure Overview

| Layer | Systems | Count |
|-------|---------|-------|
| Compute | Proxmox VE cluster | 6 nodes |
| Orchestration | K3s Kubernetes | 12 nodes |
| Storage | TrueNAS | 1 |
| Networking | Nginx Proxy Manager, Cloudflare Tunnels, UniFi VLANs | 4 VLANs |
| Monitoring | Prometheus, Grafana, Uptime Kuma, Custom NOC | 4 services |
| Edge | APRS iGate (home + mobile), Direwolf TNC | 2 nodes |

---

## Featured Projects

### Ced's NOC Dashboard

Real-time monitoring system with live system health, latency tracking, severity-based alerts, and layer filtering.

- **Live:** https://noc.chasedumphord.com
- **Source:** https://github.com/ced4568/ceds-noc

### Ced's HomeLab

Full enterprise-style homelab with Proxmox clustering, K3s orchestration, VLAN segmentation, and full observability stack including Prometheus scraping.

- **Source:** https://github.com/ced4568/ceds-homelab

### APRS iGate (RF Edge System)

Dual-node RF-to-internet gateway. Raspberry Pi + Direwolf TNC. Live on aprs.fi.

- **Source:** https://github.com/ced4568/ceds-aprs-igate

---

## 🧰 Tech Stack

**Infrastructure:** Proxmox VE • K3s • Docker • TrueNAS • Nginx Proxy Manager • Cloudflare Tunnels

**Monitoring:** Prometheus • Grafana • Uptime Kuma • Custom NOC Dashboard

**Networking:** UniFi • VLAN Segmentation • Cloudflare DNS

**Edge / RF:** Direwolf • APRS-IS • Raspberry Pi • RTL-SDR

**Development:** Python • Bash • JavaScript • HTML/CSS • Git

**AI & Automation:** Claude (Anthropic) • LLM-assisted Documentation • Prompt Engineering

---

## Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/toochase-dumphord/)
[![GitHub](https://img.shields.io/badge/GitHub-ced4568-black?style=for-the-badge&logo=github)](https://github.com/ced4568)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge)](https://chasedumphord.com)
[![NOC](https://img.shields.io/badge/NOC-Live-cyan?style=for-the-badge)](https://noc.chasedumphord.com)

 chasedumphord@gmail.com | 📍 Oxford, MS

---

> This is not a static portfolio it is a live representation of working systems.
