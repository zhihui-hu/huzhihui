export default function Page() {
  return (
    <main className="flex min-h-screen items-center bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 md:px-10">
        <h1 className="text-5xl leading-none font-semibold tracking-tight sm:text-6xl md:text-7xl">
          胡志辉
        </h1>
        <div className="flex flex-col gap-4">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            自 2016 年进入职场以来，我长期专注 Web 前端、移动端、跨平台与 AI
            应用的独立开发。做过医疗，也做过金融；见过体系如何让事情变慢，也见过速度如何让判断变贵。经历越多，越相信少：少一点炫技，多一点完成；少一点喧哗，多一点准确。技术最终要交付的，不是存在感，而是一个可靠的结果。
          </p>
          <a
            className="w-fit text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            href="mailto:i@huzhihui.com"
          >
            i@huzhihui.com
          </a>
        </div>
      </section>
    </main>
  );
}
