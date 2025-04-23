// Types for Islamic content
export type HadithContent = {
    id: string
    text: string
    source: string
    reference: string
  }
  
  export type AyahContent = {
    id: string
    surah: string
    ayah: number
    text: string
    translation: string
  }
  
  export type HijriDate = {
    day: number
    month: string
    year: number
    format: string
  }
  
  // Mock data for demonstration
  const MOCK_HADITHS: HadithContent[] = [
    {
      id: "hadith-1",
      text: "The best of you are those who learn the Quran and teach it.",
      source: "Sahih al-Bukhari",
      reference: "5027",
    },
    {
      id: "hadith-2",
      text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
      source: "Sahih al-Bukhari",
      reference: "6114",
    },
    {
      id: "hadith-3",
      text: "Whoever believes in Allah and the Last Day should speak good or remain silent.",
      source: "Sahih al-Bukhari",
      reference: "6018",
    },
  ]
  
  const MOCK_AYAHS: AyahContent[] = [
    {
      id: "ayah-1",
      surah: "Al-Baqarah",
      ayah: 286,
      text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      translation: "Allah does not burden a soul beyond that it can bear.",
    },
    {
      id: "ayah-2",
      surah: "Al-Imran",
      ayah: 139,
      text: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
      translation: "Do not lose heart nor fall into despair, for you will triumph if you are believers.",
    },
    {
      id: "ayah-3",
      surah: "Ad-Duha",
      ayah: 5,
      text: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
      translation: "And your Lord will give you, and you will be satisfied.",
    },
  ]
  
  // Islamic content service
  export const IslamicContentService = {
    // Get random hadith
    getRandomHadith: async (): Promise<HadithContent> => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))
  
      // Return random hadith from mock data
      const randomIndex = Math.floor(Math.random() * MOCK_HADITHS.length)
      return MOCK_HADITHS[randomIndex]
    },
  
    // Get random ayah
    getRandomAyah: async (): Promise<AyahContent> => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))
  
      // Return random ayah from mock data
      const randomIndex = Math.floor(Math.random() * MOCK_AYAHS.length)
      return MOCK_AYAHS[randomIndex]
    },
  
    // Get daily content (alternates between hadith and ayah)
    getDailyContent: async (): Promise<HadithContent | AyahContent> => {
      // Use date to determine whether to show hadith or ayah
      const today = new Date()
      const isEvenDay = today.getDate() % 2 === 0
  
      if (isEvenDay) {
        return IslamicContentService.getRandomHadith()
      } else {
        return IslamicContentService.getRandomAyah()
      }
    },
  
    // Get Hijri date
    getHijriDate: async (): Promise<HijriDate> => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300))
  
      // In a real app, we would call an API to convert Gregorian to Hijri
      // For demo purposes, we'll use a simple approximation
      const today = new Date()
      const hijriYear = today.getFullYear() - 579 // Very rough approximation
  
      const hijriMonths = [
        "Muharram",
        "Safar",
        "Rabi al-Awwal",
        "Rabi al-Thani",
        "Jumada al-Awwal",
        "Jumada al-Thani",
        "Rajab",
        "Sha'ban",
        "Ramadan",
        "Shawwal",
        "Dhu al-Qi'dah",
        "Dhu al-Hijjah",
      ]
  
      const hijriMonth = hijriMonths[today.getMonth()]
      const hijriDay = today.getDate()
  
      return {
        day: hijriDay,
        month: hijriMonth,
        year: hijriYear,
        format: `${hijriDay} ${hijriMonth}, ${hijriYear} AH`,
      }
    },
  
    // Get motivational message based on completion
    getMotivationalMessage: (completedCount: number): string => {
      const messages = [
        "MashaAllah! Keep up the good work!",
        "SubhanAllah! Your dedication is inspiring!",
        "Alhamdulillah! You're making great progress!",
        "Allah sees your efforts and dedication!",
        "Remember, consistency is key in worship!",
        "Every dhikr is a light in your heart!",
      ]
  
      // Use completion count to select a message
      const index = completedCount % messages.length
      return messages[index]
    },
  }
  