"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "@/styles/modules/photo-report.module.scss";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { FaRegTrashAlt, FaRedoAlt } from "react-icons/fa";

// Інтерфейс фотографії
interface Photo {
  id: string;
  file: File;
  preview: string;
  caption: string;
  rotation: number;
}

// Компонент для сортування фотографій
const SortablePhoto = ({
  photo,
  index,
  updateCaption,
  deletePhoto,
  isDragging,
  rotatePhoto,
}: {
  photo: Photo;
  index: number;
  updateCaption: (id: string, caption: string) => void;
  deletePhoto: (id: string) => void;
  isDragging: boolean;
  rotatePhoto: (id: string, angle: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        className={`${styles.sortablePhoto} ${
          isDragging ? styles.dragging : ""
        }`}
        style={style}
        {...attributes}
      >
        <img
          src={photo.preview}
          alt="Фотографія"
          style={{ transform: `rotate(${photo.rotation}deg)` }}
          {...listeners}
        />
        <div className={styles.index}>{index + 1}</div>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            deletePhoto(photo.id);
          }}
          title="Видалити"
        >
          <FaRegTrashAlt size={16} />
        </button>
        <div className={styles.bottomPart}>
          <input
            type="text"
            value={photo.caption}
            onChange={(e) => updateCaption(photo.id, e.target.value)}
            placeholder="Введіть підпис"
            className={styles.captionInput}
            onClick={(e) => e.stopPropagation()}
            maxLength={50}
          />
        </div>
      </div>
      <button
        className={styles.rotateButton}
        onClick={(e) => {
          e.stopPropagation();
          rotatePhoto(photo.id, 180);
        }}
        title="Повернути вправо"
      >
        <FaRedoAlt size={16} />
      </button>
    </div>
  );
};

// Компонент для попереднього перегляду PDF
const PdfPreview = ({ photos }: { photos: Photo[] }) => {
  const photosPerPage = 8; // Сітка 2x4
  const pages = Math.ceil(photos.length / photosPerPage);

  const pageWidth = 1200;
  const pageHeight = 1600;
  const leftPadding = 110;
  const rightPadding = 20;
  const topBottomPadding = 10; // ~0.35 см
  const gap = 10;
  const photoWidth = (pageWidth - leftPadding - rightPadding - gap) / 2; // ≈ 529.5 px
  const photoHeight = photoWidth * (481 / 854); // ≈ 298.72 px
  const captionHeight = 25; // Для шрифту
  const captionGap = 5; // Відступ між підписом і фото
  const totalHeight =
    4 * (photoHeight + captionHeight + captionGap) +
    3 * gap +
    2 * topBottomPadding;
  const scale = totalHeight > pageHeight ? pageHeight / totalHeight : 1;
  const scaledPhotoWidth = photoWidth * scale;
  const scaledPhotoHeight = photoHeight * scale;
  const scaledCaptionHeight = captionHeight * scale;
  const scaledCaptionGap = captionGap * scale;

  return (
    <div className={styles.pdfPreview}>
      {Array.from({ length: pages }).map((_, pageIndex) => (
        <div
          key={pageIndex}
          id={`pdf-page-${pageIndex}`}
          className={styles.page}
          style={{
            width: `${pageWidth}px`,
            height: `${pageHeight}px`,
            padding: `${topBottomPadding}px ${rightPadding}px ${topBottomPadding}px ${leftPadding}px`,
          }}
        >
          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `repeat(2, ${scaledPhotoWidth}px)`,
              gridTemplateRows: `repeat(4, ${
                scaledPhotoHeight + scaledCaptionHeight + scaledCaptionGap
              }px)`,
              gap: `${gap}px`,
              width: `${pageWidth - leftPadding - rightPadding}px`,
              height: `${pageHeight - 2 * topBottomPadding}px`,
            }}
          >
            {photos
              .slice(pageIndex * photosPerPage, (pageIndex + 1) * photosPerPage)
              .map((photo, i) => (
                <div
                  key={photo.id}
                  className={styles.photoContainer}
                  style={{
                    width: `${scaledPhotoWidth}px`,
                    height: `${
                      scaledPhotoHeight + scaledCaptionHeight + scaledCaptionGap
                    }px`,
                  }}
                >
                  <div className={styles.caption}>
                    {photo.caption ||
                      `Фотографія №${i + 1 + pageIndex * photosPerPage}`}
                  </div>
                  <img
                    src={photo.preview}
                    alt="Фотографія"
                    style={{
                      height: `${scaledPhotoHeight}px`,
                      transform: `rotate(${photo.rotation}deg)`,
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Основний компонент сторінки
export function PhotoReportPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null); // Для DragOverlay
  ///////////////// 123 456 789 987 654 321 /////////////////////
  // Стандартизація зображення до 854x481
  const standardizeImage = async (file: File): Promise<File> => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = objectUrl;
    });

    // const targetRatio = 854 / 481;
    const targetWidth = 854;
    const targetHeight = 481;

    // const currentRatio = img.width / img.height;
    // let sourceWidth = img.width;
    // let sourceHeight = img.height;
    // let sourceX = 0;
    // let sourceY = 0;

    // if (currentRatio > targetRatio) {
    //   sourceWidth = img.height * targetRatio;
    //   sourceX = (img.width - sourceWidth) / 2;
    // } else if (currentRatio < targetRatio) {
    //   sourceHeight = img.width / targetRatio;
    //   sourceY = (img.height - sourceHeight) / 2;
    // }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d")!;
    if (img.width < img.height) {
      // Поворачиваем холст на 90 градусов влево
      ctx.translate(0, targetHeight); // Смещаем начало координат в левый нижний угол
      ctx.rotate(-Math.PI / 2); // Поворот на -90 градусов (влево)

      // Отрисовываем изображение с учётом поворота
      // После поворота ширина и высота меняются местами
      ctx.drawImage(
        img,
        0,
        0,
        targetHeight, // Теперь это ширина на холсте
        targetWidth // Теперь это высота на холсте
      );
    } else {
      // Если ориентация правильная (альбомная), рисуем без поворота
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    }

    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.9)
    );

    URL.revokeObjectURL(objectUrl);
    return new File([blob], file.name, { type: "image/jpeg" });
  };

  const rotatePhoto = (id: string, angle: number) => {
    setPhotos((photos) =>
      photos.map((photo) =>
        photo.id === id
          ? { ...photo, rotation: (photo.rotation + angle) % 360 }
          : photo
      )
    );
  };

  // Обробка завантаження файлів
  const onDrop = async (acceptedFiles: File[]) => {
    if (photos.length + acceptedFiles.length > 100) {
      setError("Максимум 100 фотографій");
      return;
    }

    setError(null);
    const compressedPhotos = await Promise.all(
      acceptedFiles.map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          });

          const standardizedFile = await standardizeImage(compressedFile);

          return {
            id: `${Date.now()}-${Math.random()}`,
            file: standardizedFile,
            preview: URL.createObjectURL(standardizedFile),
            caption: "",
            rotation: 0,
          };
        } catch (err) {
          console.error("Помилка обробки:", err);
          return null;
        }
      })
    );

    const validPhotos = compressedPhotos.filter(
      (photo) => photo !== null
    ) as Photo[];
    setPhotos([...photos, ...validPhotos]);
  };

  // Оновлення підпису
  const updateCaption = (id: string, caption: string) => {
    setPhotos(
      photos.map((photo) => (photo.id === id ? { ...photo, caption } : photo))
    );
  };

  // Видалення фото
  const deletePhoto = (id: string) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  // Обробка початку перетягування
  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Обробка завершення перетягування
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    setPhotos((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  // Генерація PDF
  const generatePDF = async () => {
    if (photos.length === 0) {
      setError("Немає фотографій для експорту");
      return;
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const photosPerPage = 8;
    const pages = Math.ceil(photos.length / photosPerPage);

    for (let pageIndex = 0; pageIndex < pages; pageIndex++) {
      const pageElement = document.getElementById(`pdf-page-${pageIndex}`);
      if (!pageElement) {
        console.error(`Сторінка ${pageIndex} не знайдена`);
        continue;
      }

      const canvas = await html2canvas(pageElement, {
        scale: 1,
        useCORS: true,
        windowWidth: 440,
        windowHeight: 625,
      });

      console.log("Розмір канви:", {
        width: canvas.width,
        height: canvas.height,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      const imgWidth = 440;
      const imgHeight = 625;

      if (pageIndex > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    }

    pdf.save("photo-report.pdf");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: true,
  });

  const activePhoto = photos.find((photo) => photo.id === activeId);

  return (
    <div className={styles.photoReport}>
      <h1 className={styles.title}>Створення фотозвіту</h1>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ""}`}
      >
        <input {...getInputProps()} />
        <p>
          Перетягніть фотографії сюди або натисніть для вибору (до 100 файлів)
        </p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <SortableContext items={photos.map((photo) => photo.id)}>
          <div className={styles.photoGrid}>
            {photos.map((photo, index) => (
              <SortablePhoto
                key={photo.id}
                photo={photo}
                index={index}
                updateCaption={updateCaption}
                deletePhoto={deletePhoto}
                rotatePhoto={rotatePhoto}
                isDragging={activeId === photo.id}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activePhoto && (
            <div className={styles.dragOverlay}>
              <img
                src={activePhoto.preview}
                alt="Фотографія"
                style={{ transform: `rotate(${activePhoto.rotation}deg)` }}
              />
              <div className={styles.index}>
                {photos.findIndex((p) => p.id === activeId) + 1}
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
      {photos.length > 0 && (
        <div className={styles.buttonGroup}>
          <button onClick={generatePDF} className={styles.generateButton}>
            Створити PDF
          </button>
          <button
            onClick={() => setPhotos([])}
            className={styles.clearAllButton}
          >
            Видалити всі фото
          </button>
        </div>
      )}
      <PdfPreview photos={photos} />
    </div>
  );
}
