const request=require('supertest');
const {assert}=require('chai');
const mongoose=require('mongoose');

const Users=require('../../../Databases/users_collection.js');
const Booked_Tickets=require('../../../Databases/booked_tickets_collection.js');
const Movies=require('../../../Databases/movies_collection.js');
const Auditoriums=require('../../../Databases/auditoriums_collection.js');

mongoose.connect("mongodb://127.0.0.1:27017/MBP")
.then(()=>{console.log("Connected to Database...")})
.catch((error)=>{console.log(error)});

describe("Back-End Testing",()=>{
    it('Testing checkUser Api', async ()=>{
        let tempUsername='temporary';
        let tempPassword='Temporary';

        const response=await request("http://localhost:4002").get(`/user/?username=${tempUsername}&password=${tempPassword}`).send();
        assert.equal(response.status,200);
    });
    
    after(()=>{
        let tempUsername='temp';
        Users.findOneAndRemove({
            Username:tempUsername
        }).catch((error)=>{console.log(error)});
    })
    it('Testing addUser Api',async ()=>{
        let tempUsername='temp';
        let tempPassword='Temp@123';
        let tempEmail='temp@email.com';
        let tempPhone='1234567890';

        const response=await request("http://localhost:4002").post(`/user/?username=${tempUsername}&password=${tempPassword}&email=${tempEmail}&phone=${tempPhone}`).send();
        assert.equal(response.status,200);
    });

    it("Testing checkMatchingTickets Api",async ()=>{
        let tempUsername='temporary';

        Booked_Tickets.findOne({
            Username:tempUsername
        }).then(async (doc)=>{
            const response=await request("http://localhost:4002").get(`/user/bookings/?user=${tempUsername}`).send();
            if(doc)
            assert.equal(response.status,200);
            else assert.equal(response.status,204);
        });    
    });

    it("Testing getMoviesInfo Api",async ()=>{
        Movies.find({}).then(async (doc)=>{
            const response=await request("http://localhost:4002").get("/movies").send();
            assert.equal(JSON.parse(response.text),doc);
        });
    });

    it("Testing getSeats Api",async ()=>{
        let tempAudi;
        let tempSlot="1";
        let tempDay=new Date().getDay();

        Auditoriums.find({}).then(async (docs)=>{
            tempAudi=docs[0].Auditorium
            const response=await request("http://localhost:4002").get(`/movies/seats/?audi=${tempAudi}&slot=${tempSlot}&day=${tempDay}`);
            assert.ok(JSON.parse(response.text).length<=50);
        });
    });

    it("Testing addShow and removeShow Api",async ()=>{
        let testMovie='testmovie';
        let testAudi='testaudi';
        let testPoster='testposter';

        let response=await request("http://localhost:4002").get(`/movies/?movie=${testMovie}&audi=${testAudi}&poster_src=${testPoster}`);
        assert.equal(response.status,200);

        response=await request("http://localhost:4002").get(`/movies/?movie=${testMovie}&audi=${testAudi}`);
        Movies.findOne({
            Movie_name:testMovie
        }).then((doc)=>{
            assert.notOk(doc);
        })
        assert.equal(response.status,200);
    })
});