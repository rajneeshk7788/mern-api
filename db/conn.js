const mongoose=require('mongoos');

const DB = process.env.DATABASE;

mongoose.connect(DB
    //     useNewUrlParser:true,
    //     useCreateIndex:true,
    //     useUnifiedTopology:true,
    //     useFindAndModify:false
    // }
    ).then(()=>{
    console.log(`connection Successful`);

}).catch((err)=>console.log(`No Connection`));