export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POST only" });
  }

  const { job } = req.body;

  res.status(200).json({
    message: "Received job description:\n\n" + job
  });
}
