import { Firestore, WriteResult } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirestoreFilter } from './firestore.entity';

@Injectable()
export class FirestoreService {
  private firestore: Firestore;

  constructor(private configService: ConfigService) {
    this.firestore = new Firestore(
      this.configService.get<FirebaseFirestore.Settings>('firestore'),
    );
  }

  getFirestore(): Firestore {
    return this.firestore;
  }

  async addDocument(
    collection: string,
    id: string,
    data: any,
  ): Promise<string> {
    const docRef = this.firestore.collection(collection).doc(id);
    await docRef.set(data);
    return docRef.id;
  }

  async getDocument(collection: string, id: string): Promise<any> {
    const doc = await this.firestore.collection(collection).doc(id).get();
    return doc.exists ? { id, ...doc.data() } : null;
  }

  async getAllDocuments(
    collection: string,
    limitCount: number,
    page: number,
    filters: FirestoreFilter[] = [],
    orderByField: string = '',
    orderByDirection: 'asc' | 'desc' = 'asc',
  ): Promise<any[]> {
    if (page < 1) {
      throw new Error('Page number must be greater than or equal to 1.');
    }

    let query: any = this.firestore.collection(collection);

    for (const filter of filters) {
      query = query.where(filter.field, filter.operator, filter.value);
    }

    if (orderByField) {
      query = query.orderBy(orderByField, orderByDirection);
    }

    const skip = (page - 1) * limitCount;

    if (skip > 0) {
      const skipSnapshot = await query.limit(skip).get();

      if (skipSnapshot.docs.length < skip) {
        return [];
      }

      const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];
      query = query.startAfter(lastDoc);
    }

    query = query.limit(limitCount);

    const snapshot = await query.get();

    if (snapshot.empty) {
      return [];
    }

    const documents = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return documents;
  }

  async getTotalDocuments(collection: string): Promise<number> {
    try {
      const snapshot = await this.firestore.collection(collection).get();
      return snapshot.size;
    } catch (error) {
      console.error('Error getting all documents:', error);
      return 0;
    }
  }

  async updateDocument(
    collection: string,
    id: string,
    data: any,
  ): Promise<WriteResult> {
    try {
      return await this.firestore.collection(collection).doc(id).update(data);
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  async deleteDocument(collection: string, id: string): Promise<void> {
    try {
      const docRef = this.firestore.collection(collection).doc(id);
      await docRef.delete();
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }
}
