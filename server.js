const express = require("express");
const os = require("os");

const app = express();
const port = process.env.PORT || 3000;

function getServerIp() {
  const interfaces = os.networkInterfaces();

  for (const addresses of Object.values(interfaces)) {
    for (const address of addresses || []) {
      if (address.family === "IPv4" && !address.internal) {
        return address.address;
      }
    }
  }

  return "127.0.0.1";
}

function getCpuUsage() {
  const cpus = os.cpus();
  const usage = cpus.map((cpu) => {
    const total = Object.values(cpu.times).reduce((sum, time) => sum + time, 0);
    const idle = cpu.times.idle;

    return {
      model: cpu.model,
      speedMHz: cpu.speed,
      usagePercent: Number((((total - idle) / total) * 100).toFixed(2))
    };
  });

  const averageUsagePercent =
    usage.length === 0
      ? 0
      : Number(
          (
            usage.reduce((sum, cpu) => sum + cpu.usagePercent, 0) /
            usage.length
          ).toFixed(2)
        );

  return {
    averageUsagePercent,
    cores: usage
  };
}

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 24.99,
    inStock: true
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 89.99,
    inStock: true
  },
  {
    id: 3,
    name: "USB-C Hub",
    price: 39.99,
    inStock: false
  }
];

app.get("/", (req, res) => {
  res.json({
    app: "node-test-app",
    endpoints: ["/health", "/status", "/products"]
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    serverIp: getServerIp(),
    cpuUsage: getCpuUsage(),
    timestamp: new Date().toISOString()
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
