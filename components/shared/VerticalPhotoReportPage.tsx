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
import styles from "@/styles/modules/photo-report-vertical.module.scss";
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
          style={{
            transform: `rotate(${photo.rotation}deg)`,
            // Корекція розмірів при повороті
            maxWidth: photo.rotation % 180 !== 0 ? "390px" : "220px",
            maxHeight: photo.rotation % 180 !== 0 ? "220px" : "390px",
          }}
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
          rotatePhoto(photo.id, 90); // 90° для вертикальних фото
        }}
        title="Повернути вправо"
      >
        <FaRedoAlt size={16} />
      </button>
    </div>
  );
};

// Компонент для попереднього перегляду PDF
const PdfPreview = ({ photos, title }: { photos: Photo[]; title: string }) => {
  const photosPerPage = 9; // Сітка 3x3
  const pages = Math.ceil(photos.length / photosPerPage);

  // Розміри сторінки в пікселях (A4: 595x842 pt, переводимо в пікселі при 96 DPI)
  const pageWidth = 600; // Ширина сторінки
  const pageHeight = 800; // Висота сторінки
  const leftPadding = 10;
  const rightPadding = 10;
  const topPadding = 10;
  const bottomPadding = 40;
  const gap = 10;

  // Розміри фотографії (вертикальна орієнтація, наприклад, 481x854)
  const photoWidth = (pageWidth - leftPadding - rightPadding - 2 * gap) / 3; // ≈ 185 px
  const photoHeight = photoWidth * (624 / 481); // ≈ 328 px
  const captionHeight = 14; // Висота підпису
  const captionGap = 15; // Відступ між фото та підписом

  // Перевірка масштабування, якщо вміст не вміщається
  const totalHeight =
    3 * (photoHeight + captionHeight + captionGap) +
    2 * gap +
    topPadding +
    bottomPadding +
    20;
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
            padding: `${topPadding}px ${rightPadding}px ${bottomPadding}px ${leftPadding}px`,
          }}
        >
          <div
            className={styles.pageTitle}
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#000",
              textAlign: "left",
              marginBottom: "10px",
              paddingLeft: "24px",
            }}
          >
            {title || "Об'єкт оцінки"}
          </div>
          <div
            className={styles.grid}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(3, ${scaledPhotoWidth}px)`,
              gridTemplateRows: `repeat(3, ${
                scaledPhotoHeight + scaledCaptionHeight + scaledCaptionGap
              }px)`,
              gap: `${gap}px`,
              width: `${pageWidth - leftPadding - rightPadding}px`,
              height: `${pageHeight - topPadding - bottomPadding - 20}px`,
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
                      width: `${scaledPhotoWidth}px`,
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
export function VerticalPhotoReportPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null); // Для DragOverlay
  const [title, setTitle] = useState<string>("Об'єкт оцінки");
  // Стандартизація зображення до 854x481
  const standardizeImage = async (file: File): Promise<File> => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = objectUrl;
    });

    const targetWidth = 481; // Ширина для вертикальної орієнтації
    const targetHeight = 854; // Висота для вертикальної орієнтації

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d")!;

    // Якщо зображення горизонтальне, повертаємо його на 90 градусів
    if (img.width > img.height) {
      ctx.translate(targetWidth, 0);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, 0, 0, targetHeight, targetWidth);
    } else {
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

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
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
      unit: "pt", // Використовуємо пункти для A4
      format: "a4", // 595x842 pt
    });

    const photosPerPage = 9;
    const pages = Math.ceil(photos.length / photosPerPage);

    for (let pageIndex = 0; pageIndex < pages; pageIndex++) {
      const pageElement = document.getElementById(`pdf-page-${pageIndex}`);
      if (!pageElement) {
        console.error(`Сторінка ${pageIndex} не знайдена`);
        continue;
      }

      const canvas = await html2canvas(pageElement, {
        scale: 2, // Підвищена роздільна здатність для чіткості
        useCORS: true,
        windowWidth: 595, // A4 ширина в пунктах
        windowHeight: 842, // A4 висота в пунктах
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      const imgWidth = 595; // Ширина A4 в пунктах
      const imgHeight = 842; // Висота A4 в пунктах

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
      <div className={styles.titleInputContainer}>
        <input
          type="text"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Введіть заголовок (наприклад, Об'єкт оцінки)"
          className={styles.titleInput}
          maxLength={100}
        />
      </div>
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
      <PdfPreview photos={photos} title={title} />
    </div>
  );
}
