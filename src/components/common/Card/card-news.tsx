interface NewsItem {
  id: number;
  title: string;
  image: string;
}

export default function CardNews({ news }: { news: NewsItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-prompt_Ligte">
      {news.map((item) => (
        <div
          key={item.id}
          className="relative rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group h-64"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/50" />
          <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium drop-shadow-md">
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
}
