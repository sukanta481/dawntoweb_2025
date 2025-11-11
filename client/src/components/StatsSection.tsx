const stats = [
  { value: "2", label: "Websites Delivered" },
  { value: "5+", label: "AI Agents Ready" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "2024", label: "Founded & Growing" },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="text-4xl md:text-5xl font-bold mb-2" data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-primary-foreground/80" data-testid={`text-stat-label-${index}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
