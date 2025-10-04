# DevCard Deployment Guide

This guide explains how to set up automated deployments for your DevCard application using GitHub Actions, NGINX, and PM2.

## 🚀 Automated Deployment (GitHub Actions)

### Prerequisites

Your server should have:

- **Node.js** (v22+ recommended)
- **npm**
- **PM2** (`npm install -g pm2`)
- **NGINX**
- **Git**

### Server Setup

1. **Install required packages:**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm nginx git

# Install PM2 globally
sudo npm install -g pm2

# Start PM2 on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

2. **Create SSH key for GitHub Actions:**

```bash
# On your server, generate SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions@yourserver.com"

# Add the public key to authorized_keys
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

# Copy the private key (you'll need this for GitHub secrets)
cat ~/.ssh/id_rsa
```

3. **Configure NGINX:**

```bash
# Ensure NGINX is running
sudo systemctl enable nginx
sudo systemctl start nginx

# Create sites directories if they don't exist
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled
```

4. **Create NGINX configuration** (replace `yourdomain.com` with your actual domain):

```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

**Basic HTTP configuration:**

```nginx
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_redirect off;
    }

  # Static files optimization
  location /_next/static {
    alias /root/apps/yourdomain.com/.next/static;
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  location /images {
    alias /root/apps/yourdomain.com/public/images;
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

**Enable the site:**

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### GitHub Secrets Configuration

Go to your repository → **Settings** → **Secrets and variables** → **Actions** and add:

| Secret Name          | Description                                | Example                                  |
| -------------------- | ------------------------------------------ | ---------------------------------------- |
| `CD_SSH_IP`          | Your server's IP address                   | `192.168.1.100`                          |
| `CD_SSH_USERNAME`    | SSH username (usually `root` or your user) | `root`                                   |
| `CD_SSH_WEBSITE_URL` | Your domain name                           | `mydevcard.com`                          |
| `CD_SSH_PRIVATE_KEY` | Private SSH key content                    | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

### How It Works

When you push to the `main` branch:

1. **GitHub Actions triggers** the deployment workflow
2. **Connects to your server** via SSH using the private key
3. **Clones/updates** the repository in `/root/apps/{your-domain}/`
4. **Preserves existing data** directory (if present)
5. **Creates .env** from .env.example (if needed)
6. **Installs dependencies** and builds the application
7. **Checks NGINX configuration exists** (fails if not found)
8. **Tests NGINX configuration** for syntax errors
9. **Starts/restarts PM2 process** with your domain as the name
10. **Reloads NGINX** to apply any changes

### File Structure on Server

```
/root/apps/yourdomain.com/
├── .git/                    # Git repository
├── .next/                   # Built Next.js application
├── data/                    # Your profile data (preserved)
├── src/                     # Source code
├── public/                  # Static assets
├── .env                     # Environment variables
├── package.json
└── ...

/etc/nginx/sites-available/yourdomain.com  # NGINX config
/etc/nginx/sites-enabled/yourdomain.com    # Symlink to above
```

## 🔧 Manual Deployment

For manual deployments or testing, you can use the deployment script:

```bash
# Set environment variables
export CD_SSH_IP="192.168.1.100"
export CD_SSH_USERNAME="root"
export CD_SSH_WEBSITE_URL="mydevcard.com"
export CD_SSH_PORT="22"  # Optional, defaults to 22

# Run deployment
./scripts/deploy.sh
```

## 🌐 NGINX Configuration

**⚠️ Important:** You must manually create the NGINX configuration before running deployments.

The deployment expects an NGINX configuration at `/etc/nginx/sites-available/{your-domain}` with:

- **Reverse proxy** to your Next.js application (port 3000)
- **Static file serving** for optimized assets (optional)
- **Proper headers** for Next.js applications

**The deployment will fail if no NGINX configuration is found.**

### SSL/HTTPS Setup (Manual)

After deployment, you can add SSL certificates:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal (optional)
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoring & Management

### PM2 Commands

```bash
# Check application status
pm2 list

# View logs
pm2 logs yourdomain.com

# Restart application
pm2 restart yourdomain.com

# Stop application
pm2 stop yourdomain.com

# Monitor resources
pm2 monit
```

### NGINX Commands

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart NGINX
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

## 🚨 Troubleshooting

### Common Issues

1. **Deployment fails with SSH connection error:**

- Verify SSH key is correctly added to GitHub secrets
- Check server IP and username
- Ensure SSH service is running on server

2. **NGINX configuration error:**

- Run `sudo nginx -t` to check configuration
- Check NGINX error logs: `sudo tail -f /var/log/nginx/error.log`

3. **Application not starting:**

- Check PM2 logs: `pm2 logs yourdomain.com`
- Verify Node.js and npm versions
- Check if port 3000 is available

4. **Website not accessible:**

- Verify domain DNS points to server IP
- Check firewall settings (ports 80, 443)
- Ensure NGINX is running and configuration is correct

### Logs Location

- **PM2 logs:** `~/.pm2/logs/`
- **NGINX access logs:** `/var/log/nginx/access.log`
- **NGINX error logs:** `/var/log/nginx/error.log`

## 🔒 Security Considerations

1. **Use SSH keys** instead of passwords
2. **Configure firewall** to allow only necessary ports
3. **Regular updates** of server packages
4. **SSL certificates** for HTTPS
5. **Backup strategy** for your data directory

## 📝 Environment Variables

The deployment script supports these environment variables in `.env`:

```bash
# Server configuration
PORT=3000

# Optional: Custom site metadata
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your DevCard
NEXT_PUBLIC_SITE_DESCRIPTION=Your custom description

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🎯 Next Steps

After successful deployment:

1. **Configure SSL** with Let's Encrypt
2. **Set up monitoring** (optional)
3. **Configure backups** for your data directory
4. **Test the deployment** process
5. **Monitor application** performance

---

🎉 **Your DevCard is now automatically deployed!** Every push to `main` will trigger a new deployment.
