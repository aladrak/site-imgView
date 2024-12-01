document.addEventListener('DOMContentLoaded', () => {
    const imageElement = document.getElementById('image');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const imageCounter = document.getElementById('imageCounter');
    let currentIndex = 1;
    let totalImages = 0;

    // Функция для проверки существования изображения
    function imageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // Функция для определения количества изображений
    async function getTotalImages() {
        let index = 1;
        while (await imageExists(`images/image${index}.png`)) {
            index++;
        }
        return index - 1;
    }

    // Функция для обновления счетчика изображений
    function updateImageCounter() {
        imageCounter.textContent = `${currentIndex}/${totalImages}`;
    }

    // Определяем количество изображений при загрузке страницы
    getTotalImages().then(count => {
        totalImages = count;
        updateImageCounter();
    });

    nextButton.addEventListener('click', async () => {
        currentIndex = (currentIndex % totalImages) + 1;
        imageElement.src = `images/image${currentIndex}.png`;
        updateImageCounter();
    });

    prevButton.addEventListener('click', async () => {
        currentIndex = (currentIndex - 2 + totalImages) % totalImages + 1;
        imageElement.src = `images/image${currentIndex}.png`;
        updateImageCounter();
    });
});