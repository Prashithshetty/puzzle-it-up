
import React, { useState, useRef } from 'react';
import { COLORS } from '../constants';
import Button from './Button';
import type { ImagePart } from '../types';

interface HomeScreenProps {
  onStart: (payload: { text: string; images?: ImagePart[] }) => void;
  error: string | null;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64Data = result.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = (error) => reject(error);
    });
};

const Mascot: React.FC = () => (
    <div style={{backgroundColor: COLORS.primary.yellow}} className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-white">
        <span className="text-5xl">🦉</span>
    </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, error }) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState<{ file: File; previewUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartClick = async () => {
    if (!text.trim() && images.length === 0) return;

    const imagePayloads: ImagePart[] = await Promise.all(
        images.map(async (image) => {
            const base64Data = await fileToBase64(image.file);
            return {
                mimeType: image.file.type,
                data: base64Data,
            };
        })
    );
    
    onStart({ text, images: imagePayloads });
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
        const newImages = Array.from(files).map(file => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  }

  const hasInput = !!text.trim() || images.length > 0;

  return (
    <div className="flex flex-col items-center justify-between h-full text-center">
      <div className="w-full">
        <Mascot />
        <h1 style={{ color: COLORS.text.dark }} className="text-4xl md:text-5xl font-bold mb-2">
          Homework Puzzle Time!
        </h1>
        <p style={{ color: COLORS.primary.skyBlue }} className="text-lg mb-6">
          Type your homework, upload a picture of it, or do both!
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type homework text here... (optional if uploading images)"
          className="w-full h-24 p-4 border-2 border-gray-300 rounded-2xl text-lg focus:ring-4 focus:ring-yellow-300/50 focus:border-yellow-400 transition duration-200"
        />
        
        <div className="my-4 text-gray-500 font-semibold text-lg">AND/OR</div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4 p-2 border-2 border-dashed border-gray-300 rounded-2xl">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image.previewUrl} alt={`Homework preview ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                <button onClick={() => removeImage(index)} style={{backgroundColor: COLORS.primary.coral}} className="absolute top-0 right-0 -mt-2 -mr-2 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">&times;</button>
              </div>
            ))}
          </div>
        )}
        
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept="image/*"
            className="hidden" 
            multiple
        />
        <Button 
            onClick={handleImageUploadClick}
            text="Upload Image(s)"
            color={COLORS.primary.skyBlue}
            leftIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
        />
      </div>
      
      <div className="w-full mt-6">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <Button 
          onClick={handleStartClick}
          disabled={!hasInput}
          text="Create Puzzles!"
          color={COLORS.primary.coral}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
