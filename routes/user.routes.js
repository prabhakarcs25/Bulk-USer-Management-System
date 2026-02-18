const express=require("express")
const routes=express.Router()

const Identity=require("../models/user.models")


routes.post('/bulk-create', async (req, res) => {
  const identities = req.body;

  if (!Array.isArray(identities) || identities.length === 0) {
    return res.status(400).json({ error: 'Request body must be a non-empty array' });
  }

  try {
    // Use insertMany for bulk insertion
    const result = await Identity.insertMany(identities, { ordered: false }); 
    // ordered: false -> continues inserting even if some documents fail
    res.status(201).json({
      message: 'Bulk insert successful',
      insertedCount: result.length,
      data: result
    });
    console.log(result)
  } catch (err) {
    // Handle duplicate key errors
    
      return res.status(400).json({ err });
    
    
    res.status(400).json({ error: err.message });
  }
});




// Example request body:
/*
[
  { filter: { email: "prabhakar@example.com" }, update: { phone: "9999999999" } },
  { filter: { email: "rahul@example.com" }, update: { fullName: "Rahul K." } }
]
*/

routes.put('/bulk-updates', async (req, res) => {
  const updates = req.body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: 'Request body must be a non-empty array' });
  }

  try {
    const bulkOps = updates.map(item => ({
      updateOne: {
        filter: item.filter,
        update: { $set: item.update },
        upsert: false, // change to true if you want to insert if not exists
      },
    }));

    const result = await Identity.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Bulk update completed', result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports=routes;