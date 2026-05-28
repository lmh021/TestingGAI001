import { Candidate, School, RoomSchedule } from './types';

// Raw St. Paul's College candidate data (Doc 1)
export const rawSpcCandidates: Omit<Candidate, 'school'>[] = [
  // 5A
  { id: 'SPC-5A01', class: '5A', classNo: '1', name: 'Chan Tsun Ho Martin', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '5A' },
  { id: 'SPC-5A02', class: '5A', classNo: '2', name: 'Chau King Hei', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '5B' },
  { id: 'SPC-5A03', class: '5A', classNo: '3', name: 'Chen Houlin', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '5C' },
  { id: 'SPC-5A04', class: '5A', classNo: '4', name: 'Cheung Kwan To', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '5D' },
  { id: 'SPC-5A05', class: '5A', classNo: '5', name: 'Cheung Pak Ho', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '5E' },
  { id: 'SPC-5A06', class: '5A', classNo: '6', name: 'Deng Kai Ge', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '5E' },
  { id: 'SPC-5A07', class: '5A', classNo: '7', name: 'Ho Man Yui', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '5D' },
  { id: 'SPC-5A08', class: '5A', classNo: '8', name: 'Lam Cheuk Hang', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '5C' },
  { id: 'SPC-5A09', class: '5A', classNo: '9', name: 'Lam Shue Yan Jonathan', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '5B' },
  { id: 'SPC-5A10', class: '5A', classNo: '10', name: 'Lau Chun Him', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '5A' },
  { id: 'SPC-5A11', class: '5A', classNo: '11', name: 'Law Tin Yat Barret', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '5E' },
  { id: 'SPC-5A12', class: '5A', classNo: '12', name: 'Lee Chak Nung', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '5D' },
  { id: 'SPC-5A13', class: '5A', classNo: '13', name: 'Leung Tsz Kiu', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '5C' },
  { id: 'SPC-5A14', class: '5A', classNo: '14', name: 'Li Muk Yi', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '205' },
  { id: 'SPC-5A15', class: '5A', classNo: '15', name: 'Li O Ki Bryce', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '204' },
  { id: 'SPC-5A16', class: '5A', classNo: '16', name: 'Lui Wing Hin', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '203' },
  { id: 'SPC-5A17', class: '5A', classNo: '17', name: 'Mak Kin To James', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '202' },
  { id: 'SPC-5A18', class: '5A', classNo: '18', name: 'Ng Ka Wai', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '201' },
  { id: 'SPC-5A19', class: '5A', classNo: '19', name: 'Pang Nok Shun', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '205' },
  { id: 'SPC-5A20', class: '5A', classNo: '20', name: 'Su Zhi Cheng Alex', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '203' },
  { id: 'SPC-5A21', class: '5A', classNo: '21', name: 'Tam Chung Yiu Ian', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '203' },
  { id: 'SPC-5A22', class: '5A', classNo: '22', name: 'Wang Ruoyu', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '202' },
  { id: 'SPC-5A23', class: '5A', classNo: '23', name: 'Wang Xiang', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '201' },
  { id: 'SPC-5A24', class: '5A', classNo: '24', name: 'Wong Shun Ping', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '205' },
  { id: 'SPC-5A25', class: '5A', classNo: '25', name: 'Wu Jia An', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '204' },
  { id: 'SPC-5A26', class: '5A', classNo: '26', name: 'Yu Ho Yuk Elroy', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '203' },

  // 5B
  { id: 'SPC-5B01', class: '5B', classNo: '1', name: 'Cham Cheuk Lap', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '5B' },
  { id: 'SPC-5B02', class: '5B', classNo: '2', name: 'Chan Chun Hei Alden', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '5C' },
  { id: 'SPC-5B03', class: '5B', classNo: '3', name: 'Chan Hon Lam Arthur', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '5E' },
  { id: 'SPC-5B04', class: '5B', classNo: '4', name: 'Chan King Sum Samuel', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '5A' },
  { id: 'SPC-5B05', class: '5B', classNo: '5', name: 'Chan Ming Hin', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '5B' },
  { id: 'SPC-5B06', class: '5B', classNo: '6', name: 'Chang Shun Hang Enoch', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '5C' },
  { id: 'SPC-5B07', class: '5B', classNo: '7', name: 'Fan Chun Wai', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '5D' },
  { id: 'SPC-5B08', class: '5B', classNo: '8', name: 'Ho Man Wui', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '5E' },
  { id: 'SPC-5B09', class: '5B', classNo: '9', name: 'Hui Chun Ching Donald', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '5A' },
  { id: 'SPC-5B10', class: '5B', classNo: '10', name: 'Kwok Chun Yin Alvin', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '5B' },
  { id: 'SPC-5B11', class: '5B', classNo: '11', name: 'Lam Tsun Hei', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '5C' },
  { id: 'SPC-5B12', class: '5B', classNo: '12', name: 'Lam Wai Nok', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '5D' },
  { id: 'SPC-5B13', class: '5B', classNo: '13', name: 'Lau Cheuk Hin', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '5E' },
  { id: 'SPC-5B14', class: '5B', classNo: '14', name: 'Lau Ming Hei', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '202' },
  { id: 'SPC-5B15', class: '5B', classNo: '15', name: 'Lee Ming Yau', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '201' },
  { id: 'SPC-5B16', class: '5B', classNo: '16', name: 'Lee Pak Ching', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'D', examRoom: '202' },
  { id: 'SPC-5B17', class: '5B', classNo: '17', name: 'Leung Yu Hei', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '204' },
  { id: 'SPC-5B18', class: '5B', classNo: '18', name: 'Mak Chun Chung', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '203' },
  { id: 'SPC-5B19', class: '5B', classNo: '19', name: 'Or Pak Hei', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '202' },
  { id: 'SPC-5B20', class: '5B', classNo: '20', name: 'Tse Shing Yau', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '201' },
  { id: 'SPC-5B21', class: '5B', classNo: '21', name: 'Tsui Hin Fung Herman', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '205' },
  { id: 'SPC-5B22', class: '5B', classNo: '22', name: 'Wong Pak Yin', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '204' },
  { id: 'SPC-5B23', class: '5B', classNo: '23', name: 'Wong Shu Hang Carson', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '203' },
  { id: 'SPC-5B24', class: '5B', classNo: '24', name: 'Yeung Hoi Shun', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '202' },
  { id: 'SPC-5B25', class: '5B', classNo: '25', name: 'Yip Tsz Him', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '201' },
  { id: 'SPC-5B26', class: '5B', classNo: '26', name: 'Yip Tsz Long', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '205' },

  // 5C
  { id: 'SPC-5C01', class: '5C', classNo: '1', name: 'Chan Hin Kiu Hugo', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '5B' },
  { id: 'SPC-5C02', class: '5C', classNo: '2', name: 'Chan Kwan Chak Kurtis', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '5C' },
  { id: 'SPC-5C03', class: '5C', classNo: '3', name: 'Chan Ryan Ching Wang', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '5D' },
  { id: 'SPC-5C04', class: '5C', classNo: '4', name: 'Chan Sze Yu', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '5E' },
  { id: 'SPC-5C05', class: '5C', classNo: '5', name: 'Cheng Shun Hei', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '5A' },
  { id: 'SPC-5C06', class: '5C', classNo: '6', name: 'Cheng Tsz Lok', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '5B' },
  { id: 'SPC-5C07', class: '5C', classNo: '7', name: 'Cheung Ting Yu', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '5C' },
  { id: 'SPC-5C08', class: '5C', classNo: '8', name: 'Ching Yat Long', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '5D' },
  { id: 'SPC-5C09', class: '5C', classNo: '9', name: 'Chung Pak Him', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '5E' },
  { id: 'SPC-5C10', class: '5C', classNo: '10', name: 'Chung Wing Ki', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '5A' },
  { id: 'SPC-5C11', class: '5C', classNo: '11', name: 'Ha Tin Sang', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '5B' },
  { id: 'SPC-5C12', class: '5C', classNo: '12', name: 'Hau Kai Yin', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '5D' },
  { id: 'SPC-5C13', class: '5C', classNo: '13', name: 'Ho Cheuk Yip', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '5E' },
  { id: 'SPC-5C14', class: '5C', classNo: '14', name: 'Hon Yan Ho', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '5A' },
  { id: 'SPC-5C15', class: '5C', classNo: '15', name: 'Hung Leong', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '5B' },
  { id: 'SPC-5C16', class: '5C', classNo: '16', name: 'Lai Akio', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '205' },
  { id: 'SPC-5C17', class: '5C', classNo: '17', name: 'Lai Ho Wan', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '204' },
  { id: 'SPC-5C18', class: '5C', classNo: '18', name: 'Lai Pok Man', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '203' },
  { id: 'SPC-5C19', class: '5C', classNo: '19', name: 'Lan Wai Lam', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '202' },
  { id: 'SPC-5C20', class: '5C', classNo: '20', name: 'Lau Chun Bun', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '201' },
  { id: 'SPC-5C21', class: '5C', classNo: '21', name: 'Lau Tsz Hin', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '205' },
  { id: 'SPC-5C22', class: '5C', classNo: '22', name: 'Lee Hong Kiu', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '204' },
  { id: 'SPC-5C23', class: '5C', classNo: '23', name: 'Leung Kai Kong', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '203' },
  { id: 'SPC-5C24', class: '5C', classNo: '24', name: 'Lo Chi Yin', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '202' },
  { id: 'SPC-5C25', class: '5C', classNo: '25', name: 'Luo Yacheng', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '201' },
  { id: 'SPC-5C26', class: '5C', classNo: '26', name: 'Mak Chun Kei', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '205' },
  { id: 'SPC-5C27', class: '5C', classNo: '27', name: 'Tam Chun Yin', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '204' },
  { id: 'SPC-5C28', class: '5C', classNo: '28', name: 'Tang Chun Yin', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '203' },
  { id: 'SPC-5C29', class: '5C', classNo: '29', name: 'Tsang Ho Yin', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '202' },
  { id: 'SPC-5C30', class: '5C', classNo: '30', name: 'Wong Tsz Long', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '201' },
  { id: 'SPC-5C31', class: '5C', classNo: '31', name: 'Yeung Chiu Yuen Hopper', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '205' },

  // 5D
  { id: 'SPC-5D01', class: '5D', classNo: '1', name: 'Chan Chak Kiu Ambrose', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '5E' },
  { id: 'SPC-5D02', class: '5D', classNo: '2', name: 'Chan Chee Hon Jayden', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '5D' },
  { id: 'SPC-5D03', class: '5D', classNo: '3', name: 'Chan Chun Hay', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '5C' },
  { id: 'SPC-5D04', class: '5D', classNo: '4', name: 'Chan Hiu Hong', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '5B' },
  { id: 'SPC-5D05', class: '5D', classNo: '5', name: 'Chan Pak Kui Aidan', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '5A' },
  { id: 'SPC-5D07', class: '5D', classNo: '7', name: 'Chan Tyrone', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '5D' },
  { id: 'SPC-5D08', class: '5D', classNo: '8', name: 'Chu Pak Wai', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '5C' },
  { id: 'SPC-5D09', class: '5D', classNo: '9', name: 'Hung Chun Hei Julian', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '5A' },
  { id: 'SPC-5D10', class: '5D', classNo: '10', name: 'Kwong Cheuk Kwan', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '5E' },
  { id: 'SPC-5D11', class: '5D', classNo: '11', name: 'Lam Kin Hei', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '5D' },
  { id: 'SPC-5D12', class: '5D', classNo: '12', name: 'Law Ka Ho', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '5C' },
  { id: 'SPC-5D13', class: '5D', classNo: '13', name: 'Lie Chun Ming', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '5B' },
  { id: 'SPC-5D14', class: '5D', classNo: '14', name: 'Lin Chun Kwan', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'C', examRoom: '201' },
  { id: 'SPC-5D15', class: '5D', classNo: '15', name: 'Lo Cheuk Him', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '202' },
  { id: 'SPC-5D16', class: '5D', classNo: '16', name: 'Ng Tsz Lok Aiden', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '203' },
  { id: 'SPC-5D17', class: '5D', classNo: '17', name: 'Poon Tak Him', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '204' },
  { id: 'SPC-5D18', class: '5D', classNo: '18', name: 'So Hau Lam', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '205' },
  { id: 'SPC-5D19', class: '5D', classNo: '19', name: 'Tsang Pak Yeung', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '201' },
  { id: 'SPC-5D20', class: '5D', classNo: '20', name: 'Tse Kwok Kwong', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '202' },
  { id: 'SPC-5D21', class: '5D', classNo: '21', name: 'Wong Ga Yeung', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '203' },
  { id: 'SPC-5D22', class: '5D', classNo: '22', name: 'Wong Ki Wai', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '204' },
  { id: 'SPC-5D23', class: '5D', classNo: '23', name: 'Wong Ngai', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '201' },
  { id: 'SPC-5D24', class: '5D', classNo: '24', name: 'Wong Pak Yiu Nathan', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '201' },
  { id: 'SPC-5D25', class: '5D', classNo: '25', name: 'Wong To Wang Darren', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'D', examRoom: '202' },
  { id: 'SPC-5D26', class: '5D', classNo: '26', name: 'Wong Wai Ming', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '204' },
  { id: 'SPC-5D27', class: '5D', classNo: '27', name: 'Yuen Tsz Hin', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '205' },

  // 5E
  { id: 'SPC-5E01', class: '5E', classNo: '1', name: 'Cai Pak Hin Kelvin', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '5B' },
  { id: 'SPC-5E02', class: '5E', classNo: '2', name: 'Chak Yu Jun', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '5C' },
  { id: 'SPC-5E03', class: '5E', classNo: '3', name: 'Chan Lok Hei', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '5E' },
  { id: 'SPC-5E04', class: '5E', classNo: '4', name: 'Cheng Long Hin', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '5A' },
  { id: 'SPC-5E05', class: '5E', classNo: '5', name: 'Cheung Tin Long', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '5C' },
  { id: 'SPC-5E06', class: '5E', classNo: '6', name: 'Chow Si Wang Neron', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '5D' },
  { id: 'SPC-5E07', class: '5E', classNo: '7', name: 'Choy Tsz Chung', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'C', examRoom: '5E' },
  { id: 'SPC-5E08', class: '5E', classNo: '8', name: 'Chui Chung Hei', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '5A' },
  { id: 'SPC-5E09', class: '5E', classNo: '9', name: 'Deng Sai Ting', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '5B' },
  { id: 'SPC-5E11', class: '5E', classNo: '11', name: 'Hou Baicheng', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '5D' },
  { id: 'SPC-5E12', class: '5E', classNo: '12', name: 'Hui Chi Sin', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '5A' },
  { id: 'SPC-5E13', class: '5E', classNo: '13', name: 'Kwok Yui Shu', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '5D' },
  { id: 'SPC-5E14', class: '5E', classNo: '14', name: 'Lai King Him', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '5A' },
  { id: 'SPC-5E15', class: '5E', classNo: '15', name: 'Lam Nok Him Ryan', examLocation: 'SPC', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '5A' },
  { id: 'SPC-5E16', class: '5E', classNo: '16', name: 'Lau Cheuk Hin', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '5B' },
  { id: 'SPC-5E17', class: '5E', classNo: '17', name: 'Lee Fung Tok', examLocation: 'SPC', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'B', examRoom: '5C' },
  { id: 'SPC-5E18', class: '5E', classNo: '18', name: 'Leung Ching Hon', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '204' },
  { id: 'SPC-5E19', class: '5E', classNo: '19', name: 'Ng Wai Cheung', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '203' },
  { id: 'SPC-5E20', class: '5E', classNo: '20', name: 'Pu Shengzhe', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '202' },
  { id: 'SPC-5E21', class: '5E', classNo: '21', name: 'Sheung Ching To', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'D', examRoom: '201' },
  { id: 'SPC-5E22', class: '5E', classNo: '22', name: 'So Hin Lam', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'C', examRoom: '205' },
  { id: 'SPC-5E23', class: '5E', classNo: '23', name: 'Tang Tin Long Gordon', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '202' },
  { id: 'SPC-5E24', class: '5E', classNo: '24', name: 'Tao Manuel Jim', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 5, candidateLetter: 'D', examRoom: '203' },
  { id: 'SPC-5E25', class: '5E', classNo: '25', name: 'Tong Chun Yin', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 2, candidateLetter: 'D', examRoom: '202' },
  { id: 'SPC-5E26', class: '5E', classNo: '26', name: 'Tsang Tsz Long', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 1, candidateLetter: 'C', examRoom: '201' },
  { id: 'SPC-5E27', class: '5E', classNo: '27', name: 'Wong Samuel Hon Yee', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 6, candidateLetter: 'D', examRoom: '204' },
  { id: 'SPC-5E28', class: '5E', classNo: '28', name: 'Wu Jia Chen', examLocation: 'YWGS', reportingTime: '8:15', session: 1, groupNo: 3, candidateLetter: 'C', examRoom: '205' },
  { id: 'SPC-5E29', class: '5E', classNo: '29', name: 'Wu Warren', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '204' },
  { id: 'SPC-5E30', class: '5E', classNo: '30', name: 'Ye Tsz Sing', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'C', examRoom: '204' },
  { id: 'SPC-5E31', class: '5E', classNo: '31', name: 'Yeung Cheuk Yin', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'C', examRoom: '203' },
  { id: 'SPC-5E32', class: '5E', classNo: '32', name: 'Yeung Yat', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 7, candidateLetter: 'D', examRoom: '201' },
  { id: 'SPC-5E33', class: '5E', classNo: '33', name: 'Zhao Yanjun', examLocation: 'YWGS', reportingTime: '9:25', session: 2, groupNo: 4, candidateLetter: 'D', examRoom: '205' },
];

export const spcCandidates: Candidate[] = rawSpcCandidates.map(c => ({
  ...c,
  school: 'SPC',
}));

// Reconstruct YWGS Candidates from Schedule in Doc 2
// Row A and B at both SPC and YWGS locations are YWGS candidates
export const ywgsCandidatesRaw: { id: string; name: string; examRoom: string; examLocation: 'SPC' | 'YWGS'; session: 1 | 2; groupNo: number; candidateLetter: 'A' | 'B'; reportingTime: string }[] = [
  // --- YWGS LOCATION: Session 1 Group 1 ---
  { id: 'YWGS-5B11', name: 'LAI CHI YAN', examRoom: '201', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5A12', name: 'KO CHEUK YAN', examRoom: '201', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5C13', name: 'LI YING YING', examRoom: '202', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E12', name: 'HUNG LING TUNG', examRoom: '202', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5D05', name: 'CHAU TSZ YING', examRoom: '203', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5A04', name: 'CHENG TSZ CHING JAMIE', examRoom: '203', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5E11', name: 'HUNG HOI HEI', examRoom: '204', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5C10', name: 'LEUNG HOI KIU', examRoom: '204', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B12', name: 'LAM YAN', examRoom: '205', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5C08', name: 'KWOK TSZ YU', examRoom: '205', examLocation: 'YWGS', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },

  // --- YWGS LOCATION: Session 1 Group 2 ---
  { id: 'YWGS-5A05', name: 'CHIU WING KIU WINKY', examRoom: '201', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5C09', name: 'LAU YU KIU', examRoom: '201', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B08', name: 'CHOW HEI CHING', examRoom: '202', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D07', name: 'CHENG MAN NGA YVONNE', examRoom: '202', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5A14', name: 'LAW TSZ YING', examRoom: '203', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E03', name: 'CHAU TSZ CHING', examRoom: '203', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B03', name: 'CHAN WAI ANISSA', examRoom: '204', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E09', name: 'HUI LUT YI', examRoom: '204', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5A02', name: 'CHAN HEI TUNG KIMBERLEY', examRoom: '205', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D10', name: 'LAU SUM IN', examRoom: '205', examLocation: 'YWGS', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },

  // --- YWGS LOCATION: Session 1 Group 3 ---
  { id: 'YWGS-5E10', name: 'HUI WING CHI VINCY', examRoom: '201', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5B01', name: 'AU SIN YU', examRoom: '201', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5A01', name: 'CHAN HEI TUNG', examRoom: '202', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5C11', name: 'LEUNG KAK YEE', examRoom: '202', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B02', name: 'CHAN TSZ YAU DION', examRoom: '203', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D06', name: 'CHENG CHI YING', examRoom: '203', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5A03', name: 'CHAU RUI ZI CHARISSE', examRoom: '204', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D01', name: 'CHAN LOK CHING', examRoom: '204', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B06', name: 'CHEUNG HEI TUNG', examRoom: '205', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E01', name: 'CHAN HOI TUNG', examRoom: '205', examLocation: 'YWGS', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },

  // --- YWGS LOCATION: Session 2 Group 4 ---
  { id: 'YWGS-5B04', name: 'CHAN YAN LAAM', examRoom: '201', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E05', name: 'CHEUNG WING YIN', examRoom: '201', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A06', name: 'CHOI PUI YIN', examRoom: '202', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D09', name: 'LAI HEI YEE', examRoom: '202', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5C07', name: 'HO HOI LAM', examRoom: '203', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D12', name: 'LEUNG WAI MAN', examRoom: '203', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5B13', name: 'LAU KA CHING', examRoom: '204', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E02', name: 'CHAU HO CHING CHERRY', examRoom: '204', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5C04', name: 'CHEUNG SUET NAM', examRoom: '205', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5A09', name: 'HAU KA HEI', examRoom: '205', examLocation: 'YWGS', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },

  // --- YWGS LOCATION: Session 2 Group 5 ---
  { id: 'YWGS-5E08', name: 'GUAN MEINING', examRoom: '201', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5C01', name: 'CHAN HOI YAN', examRoom: '201', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5B10', name: 'HUI YAN CHI', examRoom: '202', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D04', name: 'CHANG SUM YI ARIEL', examRoom: '202', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A07', name: 'DAI KA HEI MICHELLE', examRoom: '203', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D03', name: 'CHAN YUI CHI', examRoom: '203', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5C03', name: 'CHEUNG KA NAM', examRoom: '204', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E04', name: 'CHENG TSZ TUNG', examRoom: '204', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A11', name: 'KAN TSZ CHING', examRoom: '205', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D02', name: 'CHAN MOON TSUN', examRoom: '205', examLocation: 'YWGS', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },

  // --- YWGS LOCATION: Session 2 Group 6 ---
  { id: 'YWGS-5A10', name: 'HO YING YAN', examRoom: '201', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5B09', name: 'CHOW NAM YI ZOE', examRoom: '201', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5C06', name: 'CHU LOK YING', examRoom: '202', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D13', name: 'LEUNG YAN HEI', examRoom: '202', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5B07', name: 'CHOI KIU YING', examRoom: '203', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E07', name: 'FUNG CHEUK CHI', examRoom: '203', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A08', name: 'GONG MAN YUET', examRoom: '204', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5C05', name: 'CHIK KA BO', examRoom: '204', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5B05', name: 'CHAN ZI KAY LUZERN', examRoom: '205', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5C12', name: 'LEUNG YAN YU', examRoom: '205', examLocation: 'YWGS', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },

  // --- YWGS LOCATION: Session 2 Group 7 ---
  { id: 'YWGS-5D08', name: 'CHUNG CHEUK WING ANYSIA', examRoom: '201', examLocation: 'YWGS', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E06', name: 'CHIA LOK YEE', examRoom: '202', examLocation: 'YWGS', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D11', name: 'LEE HOI KI', examRoom: '203', examLocation: 'YWGS', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5A13', name: 'LAU WING YI', examRoom: '204', examLocation: 'YWGS', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5C02', name: 'CHAN WING KIU', examRoom: '205', examLocation: 'YWGS', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },

  // ------------ SPC LOCATION: Session 1 Group 1 ------------
  { id: 'YWGS-5A27', name: 'YEH TSZ KIU', examRoom: '5A', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D16', name: 'LO TSZ CHING', examRoom: '5A', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B14', name: 'LEE HIU LING', examRoom: '5B', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E17', name: 'TAM MAN CHING', examRoom: '5B', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5C25', name: 'YUEN SHING YUK', examRoom: '5C', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D27', name: 'ZHU TSZ KWAN', examRoom: '5C', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5A25', name: 'TUNG YAN TING', examRoom: '5D', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D17', name: 'OR CHEUK YING', examRoom: '5D', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B26', name: 'ZHANG ZIQIAN JOANNA', examRoom: '5E', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5A26', name: 'WONG CHING YIU', examRoom: '5E', examLocation: 'SPC', session: 1, groupNo: 1, candidateLetter: 'B', reportingTime: '8:15' },

  // ------------ SPC LOCATION: Session 1 Group 2 ------------
  { id: 'YWGS-5B25', name: 'YUEN WAI CHING', examRoom: '5A', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E15', name: 'NG LING YIN KYMERIE', examRoom: '5A', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5C17', name: 'SHI NING QIAN', examRoom: '5B', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5A21', name: 'NG YAN KIU', examRoom: '5B', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5A24', name: 'TAM HOI YIU', examRoom: '5C', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5B21', name: 'SIU YING PRISCILLA', examRoom: '5C', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5C24', name: 'YU YUET MAGDALENE', examRoom: '5D', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E16', name: 'SIU HOI YAN', examRoom: '5D', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B24', name: 'YEUNG SUMMER HO CHING', examRoom: '5E', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D15', name: 'LIN ENKE', examRoom: '5E', examLocation: 'SPC', session: 1, groupNo: 2, candidateLetter: 'B', reportingTime: '8:15' },

  // ------------ SPC LOCATION: Session 1 Group 3 ------------
  { id: 'YWGS-5C18', name: 'SITU YINGLAN', examRoom: '5A', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5D21', name: 'SO YAN KAY', examRoom: '5A', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5D26', name: 'YUEN CHING YAN', examRoom: '5B', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E20', name: 'WONG HOK UE', examRoom: '5B', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5B23', name: 'WONG TSZ', examRoom: '5C', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5C16', name: 'SHAM SHANON CHIYAU', examRoom: '5C', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5A20', name: 'MA NGA SEON', examRoom: '5D', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5B17', name: 'MAK WING KIU', examRoom: '5D', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },
  { id: 'YWGS-5C15', name: 'NG HOI CHING', examRoom: '5E', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'A', reportingTime: '8:15' },
  { id: 'YWGS-5E23', name: 'YEUNG YUET YAN CHARLOTTE', examRoom: '5E', examLocation: 'SPC', session: 1, groupNo: 3, candidateLetter: 'B', reportingTime: '8:15' },

  // ------------ SPC LOCATION: Session 2 Group 4 ------------
  { id: 'YWGS-5D19', name: 'SHEK SIU YU', examRoom: '5A', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E24', name: 'YOU ZIYU', examRoom: '5A', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5B19', name: 'POON CHING LIVIA', examRoom: '5B', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5C26', name: 'ZHOU TSZ CHING', examRoom: '5B', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A22', name: 'POON LOK CHING', examRoom: '5C', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E21', name: 'XU JINFEI', examRoom: '5C', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5C14', name: 'MO HOI TUNG NICOLE', examRoom: '5D', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D23', name: 'TSANG HAY YAN', examRoom: '5D', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5E22', name: 'YAN YUET', examRoom: '5E', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5A18', name: 'LIU PEIQI', examRoom: '5E', examLocation: 'SPC', session: 2, groupNo: 4, candidateLetter: 'B', reportingTime: '9:25' },

  // ------------ SPC LOCATION: Session 2 Group 5 ------------
  { id: 'YWGS-5B18', name: 'NG HIN YEE VICTORIA', examRoom: '5A', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D24', name: 'YEUNG HO YAM', examRoom: '5A', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A17', name: 'LI CARMEN', examRoom: '5B', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5C21', name: 'WONG WING LAM', examRoom: '5B', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5B15', name: 'LI WAN KI', examRoom: '5C', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D18', name: 'POON TSZ YU ERICA', examRoom: '5C', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A16', name: 'LEUNG HEE MAN', examRoom: '5D', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D22', name: 'TAM TSZ YAN', examRoom: '5D', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5C22', name: 'YAN YUEN TING', examRoom: '5E', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D20', name: 'SO KA KIU', examRoom: '5E', examLocation: 'SPC', session: 2, groupNo: 5, candidateLetter: 'B', reportingTime: '9:25' },

  // ------------ SPC LOCATION: Session 2 Group 6 ------------
  { id: 'YWGS-5C19', name: 'WONG KA YAN', examRoom: '5A', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E18', name: 'WONG CHIN WING', examRoom: '5A', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A23', name: 'POON WING SUM', examRoom: '5B', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5B16', name: 'LUI HOI KI', examRoom: '5B', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5C20', name: 'WONG SZE NGA', examRoom: '5C', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E13', name: 'LEE TSZ WING', examRoom: '5C', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5B20', name: 'SI HAU CHING', examRoom: '5D', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5E14', name: 'MAN LOK CHING', examRoom: '5D', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },
  { id: 'YWGS-5A19', name: 'LUK SIN CHING', examRoom: '5E', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5C23', name: 'YAU SUET KEI', examRoom: '5E', examLocation: 'SPC', session: 2, groupNo: 6, candidateLetter: 'B', reportingTime: '9:25' },

  // ------------ SPC LOCATION: Session 2 Group 7 ------------
  { id: 'YWGS-5E19', name: 'WONG HOI YING SOPHIA', examRoom: '5A', examLocation: 'SPC', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D25', name: 'YEUNG ZI LEI', examRoom: '5B', examLocation: 'SPC', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5A15', name: 'LEE CHEUK YIN', examRoom: '5C', examLocation: 'SPC', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5B22', name: 'TSANG CHIU WAI', examRoom: '5D', examLocation: 'SPC', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
  { id: 'YWGS-5D14', name: 'LI CHEUK YING', examRoom: '5E', examLocation: 'SPC', session: 2, groupNo: 7, candidateLetter: 'A', reportingTime: '9:25' },
];

export const ywgsCandidates: Candidate[] = ywgsCandidatesRaw.map(c => {
  // Extract class and class number from ID, e.g., YWGS-5B11 -> class: 5B, classNo: 11
  const match = c.id.match(/YWGS-(\d[A-E])(\d+)/);
  const candidateClass = match ? match[1] : '';
  const classNo = match ? String(parseInt(match[2], 10)) : '';
  return {
    ...c,
    school: 'YWGS',
    class: candidateClass,
    classNo: classNo,
  };
});

export const allCandidates = [...spcCandidates, ...ywgsCandidates];

// Room Examiner mapping
export const ROOM_EXAMINERS: Record<string, string> = {
  // YWGS
  '201': 'SK',
  '202': 'JY',
  '203': 'AW',
  '204': 'DY',
  '205': 'CR',
  // SPC
  '5A': 'KYY',
  '5B': 'TFN',
  '5C': 'AJ',
  '5D': 'WIY',
  '5E': 'MC',
};

// Define Groups and Prep/Exam timers mappings
export interface TimeSchedule {
  prepStart: string;
  prepEnd: string;
  examStart: string;
  examEnd: string;
}

export const GROUP_TIMES: Record<number, TimeSchedule> = {
  1: { prepStart: '8:30', prepEnd: '8:40', examStart: '8:42', examEnd: '9:00' },
  2: { prepStart: '8:50', prepEnd: '9:00', examStart: '9:02', examEnd: '9:20' },
  3: { prepStart: '9:10', prepEnd: '9:20', examStart: '9:22', examEnd: '9:40' },
  4: { prepStart: '9:40', prepEnd: '9:50', examStart: '9:52', examEnd: '10:10' },
  5: { prepStart: '10:00', prepEnd: '10:10', examStart: '10:12', examEnd: '10:30' },
  6: { prepStart: '10:20', prepEnd: '10:30', examStart: '10:32', examEnd: '10:50' },
  7: { prepStart: '10:40', prepEnd: '10:50', examStart: '10:52', examEnd: '11:10' },
};

// Generate comprehensive schedules for any room
export function getRoomSchedules(location: 'SPC' | 'YWGS', roomCode: string): RoomSchedule {
  const roomGroupsFiltered = allCandidates.filter(c => c.examLocation === location && c.examRoom === roomCode);
  
  const groupsList = [1, 2, 3, 4, 5, 6, 7].map(gNo => {
    const times = GROUP_TIMES[gNo];
    const groupCands = roomGroupsFiltered.filter(c => c.groupNo === gNo);
    
    return {
      groupNo: gNo,
      prepTime: `${times.prepStart} - ${times.prepEnd}`,
      examTime: `${times.examStart} - ${times.examEnd}`,
      candidates: {
        A: groupCands.find(c => c.candidateLetter === 'A') || null,
        B: groupCands.find(c => c.candidateLetter === 'B') || null,
        C: groupCands.find(c => c.candidateLetter === 'C') || null,
        D: groupCands.find(c => c.candidateLetter === 'D') || null,
      }
    };
  });

  return {
    roomCode,
    examinerId: ROOM_EXAMINERS[roomCode] || 'NA',
    location,
    groups: groupsList,
  };
}

export function searchCandidates(query: string): Candidate[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allCandidates.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.id.toLowerCase().includes(q) ||
    `${c.school}-${c.class}${c.classNo}`.toLowerCase().includes(q) ||
    `${c.class}${c.classNo}`.toLowerCase().includes(q) ||
    c.class.toLowerCase() === q
  );
}

export function getCandidateById(id: string): Candidate | undefined {
  return allCandidates.find(c => c.id === id);
}

export function getGroupMembers(location: 'SPC' | 'YWGS', room: string, groupNo: number): Candidate[] {
  return allCandidates.filter(c => c.examLocation === location && c.examRoom === room && c.groupNo === groupNo);
}

export function getStats() {
  const spcCount = spcCandidates.length;
  const ywgsCount = ywgsCandidates.length;
  const total = allCandidates.length;

  const spcAtSpc = spcCandidates.filter(c => c.examLocation === 'SPC').length;
  const spcAtYwgs = spcCandidates.filter(c => c.examLocation === 'YWGS').length;
  
  const ywgsAtSpc = ywgsCandidates.filter(c => c.examLocation === 'SPC').length;
  const ywgsAtYwgs = ywgsCandidates.filter(c => c.examLocation === 'YWGS').length;

  return {
    total,
    spcCount,
    ywgsCount,
    spcAtSpc,
    spcAtYwgs,
    ywgsAtSpc,
    ywgsAtYwgs,
    roomsSpc: ['5A', '5B', '5C', '5D', '5E'],
    roomsYwgs: ['201', '202', '203', '204', '205'],
  };
}
