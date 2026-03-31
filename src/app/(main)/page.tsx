export default function Page() {
  return (
    <main className="flex min-h-screen items-center bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 md:px-10">
        <h1 className="text-5xl leading-none font-semibold tracking-tight sm:text-6xl md:text-7xl">
          胡志辉
        </h1>
        <div className="flex flex-col gap-4">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            我长期工作在医疗与金融互联网+行业，先后经历过国企与创业私企不同的节奏、方法与判断体系。自
            2016 年 12 月开始参加工作以来，我持续专注 Web 前端、跨平台开发，以及
            AI
            在真实业务场景中的落地，更在意系统背后的秩序、效率与可持续交付。比起把经历全部铺开，我更愿意让作品、判断力与解决问题的方式说明自己。
          </p>
          <a
            className="w-fit text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            href="mailto:i@huzhihui.com"
          >
            Email: i@huzhihui.com
          </a>
        </div>
      </section>
    </main>
  );
}
