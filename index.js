const express=require("express");
const client=require("prom-client");//for Metric collection
const app=express();
app.use(express.json());
const collectDefaultMetrics=client.collectDefaultMetrics;//collect metrics like RAM,memory,utilization
collectDefaultMetrics({register:client.register});
app.get("/",async(req,res)=>{
    res.send("Hello from Rahi");
})
app.get("/metrics",async(req,res)=>{
    res.setHeader('Content-Type',client.register.contentType);
    const metrics=await client.register.metrics();
    res.send(metrics);
})
app.listen(8000,()=>{
    console.log("Server is running on the port 8000");

})
