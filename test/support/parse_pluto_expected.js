module.exports = {
  matrix: [
    [ 'BK','1','1','302','21','2000','13','33','11201','L118','84','1 JOHN STREET','M3-1','M1-4/R8A','','','','','MX-2','','','M3-1/MX-2','M1-4/R8A','Y','V1','11','1','P','BROOKLYN BRIDGE PARK','151930','0','0','0','0','0','0','0','0','0','4','0','0','0','0','206.25','337.42','0','0','','0','Y','5','5','901347','901347','0','0','0','','0','0','','','0','0','2','0','3','3000010001','0','21','987723','196222','12d','','302 007','30101','','3000010001','11/26/13','1','14v1' ],
    [ 'BK','1','2','302','21','','13','33','11201','L118','84','        JOHN STREET','M3-1','','','','','','','','','M3-1','','N','V1','11','0','P','NASTY GUY','9620','0','0','0','0','0','0','0','0','0','4','0','0','0','0','130','74','0','0','','0','N','3','5','102600','102600','0','0','0','','0','0','','','0','0','2','0','3','3000010002','0','21','','','12d','','300 000','30101','','3000010001','11/26/13','1','14v1' ],
    [ 'BK','1','50','302','21','2000','13','33','11201','L118','84','10 JAY STREET','M1-4/R8A','M3-1','','','','','MX-2','','','M1-4/R8A/MX-2','M3-1','Y','E9','6','0','P','SAFDI PLAZA REALTY I','19682','154400','154400','0','17160','0','0','68620','0','68620','7','1','9','0','90','109.08','207.25','88','195','','1','Y','3','0','834300','8316900','0','870750','1920','E','1994','2007','DUMBO','','7.84','5.4','2','6.5','3','3000010050','0','21','987838','195989','12d','','302 007','30101','E-231','0','','1','14v1' ] 
  ],
  collections: [
    {
      collection: 'properties', 
      docs: [
        { 
          _id: 0, 
          borough: 'BK',
          boro_code: 3,
          block: 1,
          lot: 1,
          location: { 
            address: '1 JOHN STREET' 
          },
          district: { 
            community_board: 302,
            school: 13,
            council: 33,
            fire: 'L118',
            police: 84 
          },
          zonings: [ 'M3-1', 'M1-4/R8A', '', '' ],
          year_built: new Date('Monday, January 01, 1900 00:00:00.000 GMT-0500')
        },
        {
          _id: 1,
          borough: 'BK',
          boro_code: 3,
          block: 1,
          lot: 2,
          location: { 
            address: '        JOHN STREET' 
          },
          district: { 
            community_board: 302,
            school: 13,
            council: 33,
            fire: 'L118',
            police: 84 
          },
          zonings: [ 'M3-1', '', '', '' ],
          year_built: new Date('Monday, January 01, 1900 00:00:00.000 GMT-0500')
        },
        {
          _id: 2,
          borough: 'BK',
          boro_code: 3,
          block: 1,
          lot: 50,
          location: { 
            address: '10 JAY STREET' 
          },
          district: { 
            community_board: 302,
            school: 13,
            council: 33,
            fire: 'L118',
            police: 84 
          },
          zonings: [ 'M1-4/R8A', 'M3-1', '', '' ],
          year_built: new Date('Thursday, January 01, 1920 00:00:00.000 GMT-0500')
        }       
      ] 
    },
    {
      collection: "property_owners",
      docs: [
        {
          type: 'unknown',
          name: "BROOKLYN BRIDGE PARK",
           _id: 0
        },
        {
          type: 'unknown',
          name: "NASTY GUY",
           _id: 1
        },
        {
          type: 'unknown',
          name: "SAFDI PLAZA REALTY I",
           _id: 2
        }
      ]
    },
    {
      collection: 'ownerships',
      docs: [
        {
          _id: 0,
          type: 'property',
          pluto_own_class: 'P',
          owner: 0,
          owned: 0
        },
        {
          _id: 1,
          type: 'property',
          pluto_own_class: 'P',
          owner: 1,
          owned: 1
        },
        {
          _id: 2,
          type: 'property',
          pluto_own_class: 'P',
          owner: 2,
          owned: 2
        }
      ]
    }
  ]
}

