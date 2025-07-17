import React, { useEffect, useState } from "react";

export default function CasteDeclarationGovFormat() {
  const [data, setData] = useState({
    name: "________",
    age: "________",
    village: "________",
    sub: "________",
    district: "________",
    childName: "________",
    caste: "________",
    Religion: "________",
    beneficiaryType: "________",
  });

  const [currentDate, setCurrentDate] = useState("________");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const getValue = (key: string) => params.get(key) || "________";

    setData({
      name: getValue("name"),
      age: getValue("age"),
      village: getValue("village"),
      sub: getValue("sub"),
      district: getValue("district"),
      childName: getValue("childName"),
      caste: getValue("caste"),
      Religion: getValue("Religion"),
      beneficiaryType: getValue("beneficiaryType"),
    });

    const today = new Date();
    setCurrentDate(today.toLocaleDateString("en-IN"));
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto text-black bg-white font-[Kruti Dev 010] print:p-0 print:shadow-none">
      <button
        onClick={() => window.print()}
        className="mb-6 px-4 py-2 bg-gray-800 text-white rounded print:hidden"
      >
        🖨️ प्रिंट करा
      </button>

      <div className="border-2 border-gray-700 p-6 relative leading-[3.2rem]">
        <h1 className="text-center text-2xl font-bold border border-gray-700 rounded-full px-6 py-1 w-fit mx-auto mb-6">
          जात प्रमाणपत्राबाबत स्वयं घोषणापत्र
        </h1>

        <p className="text-justify text-lg">
          मी नामे. <strong>{data.name}</strong>, वय <strong>{data.age}</strong>  धंदा{" "}
          <strong>{data.beneficiaryType}</strong>, रा.
          <strong> {data.village}</strong>, ता. <strong>{data.sub}</strong>, जि.
          <strong> {data.district}</strong> येथील कायम वास्तव्यास असून,
          मला / स्वत: / माझा मुलगा / माझी मुलगी नावे
          <strong> {data.childName}</strong> यांचे जात प्रमाणपत्र काढावयाचे आहे.
          
         तरी जात प्रमाणपत्र ची संचिका आपल्या कार्यालय  ऑनलाइन / ऑफलाइन पद्धतीने सादर केली असून माझी जात ही
          <strong> {data.caste}</strong> असून, जात प्रवर्ग
          <strong> {data.Religion}</strong> हा आहे.
          <br /><br />
          तरी मला <strong>{data.caste}</strong> या जातीचे प्रमाणपत्र देण्यात यावे.
          घोषित करतो / करते की वरील सर्व माहिती माझ्या व्यक्तिगत माहिती व
          समजुतीनुसार खरी आहे. 
          <br /><br />सदर माहिती खोटी आढळून आल्यास, भारतीय दंड संहिता
          १९६० कलम १९९ व २०० व अन्य / संबंधित कायद्यानुसार माझ्यावर खटला भरला जाईल
          व त्यानुसार मी शिक्षेस पात्र राहील, याची मला पूर्ण जाणीव आहे. करिता मी
          हे स्वयंघोषणापत्र लिहून देत आहे.
        </p>

        <div className="mt-10 flex justify-between text-lg">
          <div>
            ठिकाण: <strong>{data.sub}</strong>
            <br />
            दिनांक: <strong>{currentDate}</strong>
          </div>
          <div className="text-right">
            अर्जदाराची स्वाक्षरी: ___________<br />
            अर्जदाराचे नाव: <strong>{data.name}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
