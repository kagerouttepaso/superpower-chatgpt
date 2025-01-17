// eslint-disable-next-line no-unused-vars
const toneList = [
   { code: 'default', name: 'デフォルト', description: '特定のトーン指示なし' },
   { code: 'authoritative', name: '権威的', description: '主題に対する専門知識や知識を伝えるために使用されるトーン。指揮命令的で自信に満ちたトーンが特徴。例：「20年以上の経験を持つ著名な外科医として、この手術は安全で効果的だと保証できます。」' },
   { code: 'clinical', name: 'クリニカル', description: '技術的または医学的な文章で使用されるトーン。直接的で客観的で事実に基づいたトーンが特徴。例：「研究の結果、薬が患者の75％の症状を軽減させました。」' },
   { code: 'concise', name: '簡潔', description: 'できるだけ少ない言葉と文字で答えるトーン。余計な言葉を省略し、簡潔に答える。例：「データによると売り上げが50％上がった」と、代わりに「データを収集した結果、売り上げが50％上がったことが分かりました。」' },
   { code: 'cold', name: '冷たい', description: 'このトーンは無感情で、個人的ではなく距離がある。例：「災害のニュースは冷たく無感情な方法で報告された。」' },
   { code: 'confident', name: '自信に満ちた', description: '自信に満ちたトーンであり、確信を持っている。例：「努力と献身で、私たちは目標を達成できると確信しています。」' },
   { code: 'cynical', name: '皮肉な', description: 'このトーンは人間性に対して皮肉で疑い深い。例：「ああ、その政治家が本当に平凡な人々のことを心配しているか。」' },
   { code: 'emotional', name: '感情的', description: '感情や気持ちに重点を置くトーン。例：「彼女の心に打ちひしがれた生存物語は多くの人々の心を打った。」' },
   { code: 'empathetic', name: '共感的', description: '他人の視点や状況に対する理解と共感を示すトーン。例：「あなたにとってどれほど困難であるか理解しており、できる限りのサポートを提供します。」'},
   { code: 'formal', name: 'フォーマル', description: 'プロフェッショナルや学術的な文章で使用されるトーンで、真剣で客観的なトーンが特徴。例：「この報告書の目的は、私たちの調査結果を提示することです。」'},
   { code: 'friendly', name: 'フレンドリー', description: '暖かく、近づきやすく、歓迎のあるトーン。例：「こんにちは、調子はどうですか？またお会いできて嬉しいです！」'},
   { code: 'humorous', name: 'ユーモラス', description: 'このトーンは軽快で楽しく、言葉遊びや駄洒落、ジョークを使うことがよくあります。例：「なぜ科学者は原子を信用しないのですか？それは彼らがすべてを作り出しているからです！」'},
   { code: 'informal', name: 'インフォーマル', description: 'カジュアルで会話的なトーンで、短縮形や口語表現を使うことがよくあります。例：「よ、どうしたの？バーガーでも食べに行こうか？」'},
   { code: 'ironic', name: '皮肉な', description: '逆の意味を表現する言葉を使うトーン。例：「ああ、素晴らしい、楽園でまた雨の日だ。」'},
   { code: 'optimistic', name: '楽観的', description: '希望に満ち、最善の結果を期待するトーン。例：「私たちが直面する課題にもかかわらず、私はそれらを克服し、より明るい未来を築くことができると信じています。」'},
   { code: 'pessimistic', name: '悲観的', description: '否定的で、最悪の結果を予想するトーン。例：「現状を考慮すると、どうやって成功することができるのか分からない。」'},
   { code: 'persuasive', name: '説得力のある', description: '読者に特定の行動を取るか、特定の見解を持つように説得または影響を与えるために使われるトーン。感情、論理、権威への訴えなどの修辞戦略を使って特徴づけられます。例：「リサイクルを選択し、廃棄物を減らすことで、私たち一人一人が地球と未来の世代のために意義深い違いをもたらす力を持っています。今日一緒に行動しましょう。」'},
   { code: 'playful', name: '遊び心のある', description: 'このトーンは軽やかで楽しく、遊び心あふれる言葉やトーンを使うことがよくあります。例：「さあ、そんなにパーティの楽しみを台無しにしないで！」'},
   { code: 'sarcastic', name: '皮肉な', description: '皮肉とからかいのユーモアを使ったトーン。例：「そうだね、素晴らしいアイデアだね。みんなで一緒に崖から飛び降りよう！」'},
   { code: 'serious', name: '真剣な', description: 'このトーンはフォーマルでビジネスライクであり、専門的な状況でよく使われます。例：「この件を真剣に受け止め、明日までに詳細な報告書を提出してください。」'},
   { code: 'sympathetic', name: '共感的', description: '他人の感情に配慮し、思いやりのあるトーン。例：「あなたの損失について聞いて、とても残念です。私がそばにいることを覚えておいてください。」'},
   { code: 'tentative', name: 'ためらいがちな', description: '疑いや許可を求める際に使われる、不確かでためらいがちなトーン。例：「締め切りについて延期をお願いすることができるかもしれないかと思いました。」'},
   { code: 'warm', name: '暖かい', description: 'このトーンは友好的で、招待状を出し、読者との親密さやつながりを感じさせます。肯定的な言葉を使い、感謝や感謝の気持ちを表現します。例：「あなたの優しさとサポートに感謝します。あなたの励ましは私にとって大変な意味があり、あなたを人生の中に持つことができることに感謝しています。」'},
 ];