import { ObjectId } from "mongodb";
const dbName = "test"
const coll = "newdata"
let db

module.exports = {

	getDb: async (client) => {
		db = await client.db(dbName)
	},

	getSongFromDeezer: async (song) => {
		return await db.collection(coll).aggregate([{$unwind: '$topCharts.data'},
													{$match: {'topCharts.data.title' : song}},
													{$group: {'_id': null, 'songDetails': {$push:{
														'title': '$topCharts.data.title',
														'artist': '$topCharts.data.artist.name',
														'album': '$topCharts.data.album.title',
														'albumCover': '$topCharts.data.album.cover',
														'preview': '$topCharts.data.preview', 
														'Link': '$topCharts.data.link',
														'mediumPicture': '$topCharts.data.artist.picture_medium'}}}},
													{$project:{
														'songDetails' : 1,
														'_id': 0,
													}}
												])
	},
	
	addDoc: async (doc) => {
		return await db.collection(coll).insertOne(doc)
	},
	
	deleteDoc: async (id) => {
		const filter = { _id: new ObjectId(id) }
		return await db.collection(coll).deleteOne(filter)
	}
}