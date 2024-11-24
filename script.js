document.addEventListener('DOMContentLoaded', () => {
    const imageElement = document.getElementById('image');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    let currentIndex = 1;

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
        while (await imageExists(`images/image${index}.jpg`)) {
            index++;
        }
        return index - 1;
    }

    let totalImages = 0;

    // Определяем количество изображений при загрузке страницы
    getTotalImages().then(count => {
        totalImages = count;
    });

    nextButton.addEventListener('click', async () => {
        currentIndex = (currentIndex % totalImages) + 1;
        imageElement.src = `images/image${currentIndex}.jpg`;
    });

    prevButton.addEventListener('click', async () => {
        currentIndex = (currentIndex - 2 + totalImages) % totalImages + 1;
        imageElement.src = `images/image${currentIndex}.jpg`;
    });
});