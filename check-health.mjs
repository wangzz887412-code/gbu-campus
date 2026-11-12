// check-health.mjs — 一键自检：请求本地 /healthz，确认服务器是否就绪。
// 用法：node check-health.mjs（或 npm run check）
// 端口：优先读环境变量 PORT，未设置则用默认 5190（与 server.mjs 一致）。
const port = process.env.PORT === undefined ? 5190 : Number(process.env.PORT);
const url = `http://127.0.0.1:${port}/healthz`;

try {
  const res = await fetch(url, { method: 'GET' });
  const body = await res.text();
  if (res.ok && body.includes('"ok":true')) {
    console.log(`本地服务器已就绪：${url} 返回 {"ok":true}`);
    console.log('健康检查通过。可以打开游戏了。');
    process.exit(0);
  }
  console.log(`服务器有响应，但状态异常：HTTP ${res.status}，内容：${body.trim() || '(空)'}`);
  process.exit(1);
} catch (err) {
  console.log(`连接失败（${url}）：${err.cause?.code || err.message}`);
  console.log('看起来本地服务器还没有启动。先运行 npm start，再重试 npm run check。');
  process.exit(1);
}
