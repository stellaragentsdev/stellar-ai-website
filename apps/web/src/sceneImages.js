// Scene background images (public/images/scenes/). Replace a file or path to swap an image.
// Recommended: 2560x1440, WebP (or JPG), under 400 KB. Use null for a plain black scene.
// `shift`/`zoom` (optional) slide and enlarge the image, e.g. to move a subject away from the text.
// `alt` = description of the image for search engines and screen readers.
// `align` = side the text sits on (choose the image's empty, dark side); `position` = CSS object-position.
const sceneImages = {
    hero:       { layered: true, align: 'left' },
    build:      { src: '/images/scenes/build.webp',      align: 'left',  position: '75% 50%', alt: 'Long, dim data-centre aisle lined with server racks glowing teal' },
    how:        { src: null,                             align: 'left' },
    industries: { src: '/images/scenes/industries.webp', align: 'left',  position: '60% 60%', alt: 'Night-time aerial view of a city grid lit up in teal and white' },
    roi:        { src: null,                             align: 'left' },
    careers:    { src: '/images/scenes/careers.webp',    align: 'left',  position: '70% 50%', shift: '26% 0', zoom: 1.5, alt: 'Silhouette of a person at a large window looking out at Earth and a sunrise from orbit' },
    contact:    { src: '/images/scenes/contact.webp',    align: 'right', position: '25% 50%', alt: 'Rocket lifting off from a launch pad at night, its bright exhaust reflected in the water' },
};
export default sceneImages;
