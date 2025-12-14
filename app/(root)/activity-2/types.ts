export interface Photo {
  id: string;
  userId: string;
  photoName: string;
  photoUrl: string;
  title: string;
  description: string;
  fileSize: number;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  fileType: string,
  width: number,
  height: number,
}

export interface PhotoGridProps {
  fetchPhotos: Photo[];
}