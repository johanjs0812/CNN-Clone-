import mongoose, { Document, Model, Schema, Query, UpdateQuery  } from 'mongoose';

export class BaseCollection<T extends Document> {
    protected model: Model<T>;

    constructor(collectionName: string, schema: Schema) {
        this.model = mongoose.model<T>(collectionName, schema);
    }

    async fetchAll(): Promise<Document[] | undefined> {
        try {
            const items = await this.model.find(); 
            return items;
        } catch (err) {
            console.error(`Failed to fetch items from ${this.model.collection.name}`, err); 
            return undefined;
        }
    };

    async getId(id: string): Promise<Document | undefined | null> {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.error(`Error: ${error}`);
            return undefined;
        }
    };

    async add(newItem: T): Promise<T | undefined> {
        try {
            const item = new this.model(newItem); 
            const result = await item.save() as T;
            return result;
        } catch (err) {
            console.error(`Failed to add item to ${this.model.collection.name}`, err); 
            return undefined;
        }
    };

    async delete(id: string): Promise<any | undefined | null> {
        try {
            const result = await this.model.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error(`Error: ${error}`);
            return undefined;
        }
    };

    async update(id: string, newData: T): Promise<T | undefined | null> {
        try {
            const updateQuery = { $set: newData } as mongoose.UpdateQuery<T>;
            console.log('updata and id', updateQuery, id);
            const result = await this.model.findByIdAndUpdate(id, updateQuery, { new: true });
            console.log('model', result)
            return result;
        } catch (error) { 
            console.error(`Error: ${error}`);
            return undefined;
        }
    };

    async updateSubcollection(parentId: string, subId: string, newData: T): Promise<T | undefined | null> {
        try {

            const updateQuery = {
                $set: {
                    "subcategories.$.name": (newData as any).name,
                    "subcategories.$.slug": (newData as any).slug,
                    "subcategories.$.updatedAt": (newData as any).updatedAt
                }
            } as mongoose.UpdateQuery<T>;

            console.log('update and id', updateQuery, subId);

            const result = await this.model.findOneAndUpdate(
                { "_id": parentId, "subcategories._id": subId }, 
                updateQuery, 
                { new: true }
            );

            console.log('model', result)

            return result;
        } catch (error) { 
            console.error(`Error: ${error}`);
            return undefined;
        }
    }; 

    async deleteSubcollection(parentId: string, subId: string): Promise<T | undefined | null> {
        try {
            const updateQuery = {
                $pull: {
                    "subcategories": { _id: subId }
                }
            } as mongoose.UpdateQuery<T>;
    
            console.log('delete and id', updateQuery, subId);
    
            const result = await this.model.findOneAndUpdate(
                { "_id": parentId }, 
                updateQuery, 
                { new: true }
            );
    
            console.log('model', result)
    
            return result;
        } catch (error) { 
            console.error(`Error: ${error}`);
            return undefined;
        }
    };    

    async addSubcollection(parentId: string, newData: T): Promise<T | undefined | null> {
        try {
            const updateQuery = {
                $push: {
                    "subcategories": newData
                }
            } as mongoose.UpdateQuery<T>;
    
            console.log('add and id', updateQuery, parentId);
    
            const result = await this.model.findOneAndUpdate(
                { "_id": parentId }, 
                updateQuery, 
                { new: true }
            );
    
            console.log('model', result)
    
            return result;
        } catch (error) { 
            console.error(`Error: ${error}`);
            return undefined;
        }
    };    

    async updateComment(id: string, newData: T): Promise<T | undefined | null> {
        try {
            const updateQuery = { 
                $set: {
                    "content": (newData as any).content,
                    "updatedAt": (newData as any).updatedAt
                }
            } as mongoose.UpdateQuery<T>;
            
            const result = await this.model.findOneAndUpdate(
                { "_id": id }, 
                updateQuery, 
                { new: true }
            );
    
            if (!result) {
                console.log(`Document with ID ${id} not found.`);
                return null;
            }
    
            console.log('Updated document:', result);
            
            return result;
        } catch (error) { 
            console.error(`Error updating document: ${error}`);
            return undefined;
        }
    };  
    
    async getArticlesByCategoryId(categoryId: string): Promise<Document[] | undefined> {
        try {
            const articles = await this.model.find({ categoryId: categoryId });
            return articles;
        } catch (error) {
            console.error(`Error: ${error}`);
            return undefined;
        }
    };

    async updateArt(id: string, newData: T): Promise<T | undefined | null> {
        try {
            const updateQuery = { 
                $set: {
                    "title": (newData as any).title,
                    "img": (newData as any).img,
                    "categoryId": (newData as any).categoryId,
                    "content": (newData as any).content,
                    "updatedAt": (newData as any).updatedAt
                }
            } as mongoose.UpdateQuery<T>;
            
            const result = await this.model.findOneAndUpdate(
                { "_id": id }, 
                updateQuery, 
                { new: true }
            );
    
            if (!result) {
                console.log(`Document with ID ${id} not found.`);
                return null;
            }
    
            console.log('Updated document:', result);
            
            return result;
        } catch (error) { 
            console.error(`Error updating document: ${error}`);
            return undefined;
        }
    };  
    
    async deleteSubcmtOnArt(parentId: string, sub: string): Promise<T | undefined | null> {
        try {
            const updateQuery = {
                $pull: {
                    "comments": sub
                }
            } as mongoose.UpdateQuery<T>;
    
            console.log('delete and id', updateQuery, sub);
    
            const result = await this.model.findOneAndUpdate(
                { "_id": parentId }, 
                updateQuery, 
                { new: true }
            );
    
            console.log('model', result)
    
            return result;
        } catch (error) { 
            console.error(`Error: ${error}`);
            return undefined;
        }
    };

    async getUser(username: string, email: string): Promise<{usernameExists: boolean, emailExists: boolean}> {
        const result = { usernameExists: false, emailExists: false };
        console.log('band', username, email)
        try {
            const usernameResult = await this.model.findOne({ username });
            console.log('user', usernameResult)

            if (usernameResult) {
                result.usernameExists = true;
                return result;
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    
        try {
            const emailResult = await this.model.findOne({ email });
            console.log('user', emailResult);

            if (emailResult) {
                result.emailExists = true;
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    
        return result;
    };   
    
    async getCommentOnArt(listid: any): Promise<Document | undefined | null> {
        try {
            const comments = await this.model.find({
                '_id': { $in: listid }
            }) as any;
            return comments;
        } catch (error) {
            console.error(`Error: ${error}`);
            return undefined;
        }
    };

    async addSubcmtOnArt(parentId: string, sub: string): Promise<T | undefined | null> {
        try {
            const updateQuery = {
                $push: {
                    "comments": sub
                }
            } as mongoose.UpdateQuery<T>;
    
            console.log('add and id', updateQuery, sub);
    
            const result = await this.model.findOneAndUpdate(
                { "_id": parentId }, 
                updateQuery, 
                { new: true }
            );
    
            console.log('model', result)
    
            return result;
        } catch (error) { 
            console.error(`Error: ${error}`);
            return undefined;
        }
    };
    
}

