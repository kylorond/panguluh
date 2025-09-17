document.addEventListener('DOMContentLoaded', function () {
            const translations = {
                en: {
                    welcomeTitle: "Welcome!",
                    welcomeSubtitle: "This application is designed to help you make complex decisions using the Simple Additive Weighting (SAW) method. Define criteria, assign weights, evaluate alternatives, and get an objective final ranking.",
                    guideTitle: "Complete User Guide",
                    step1Title: "Set a Title",
                    step1Desc: "Enter a clear title to provide context for your analysis. Example: \"Best Laptop for Design\".",
                    step2Title: "Input Criteria",
                    step2Desc: "Define the determining factors. <strong>Weight</strong> indicates importance (total must be <strong>100</strong>). Choose <strong>Benefit</strong> (higher is better) or <strong>Cost</strong> (lower is better).",
                    step3Title: "Input Alternatives",
                    step3Desc: "List all the options to be evaluated. Example: \"Laptop A\", \"Laptop B\", \"Laptop C\".",
                    step4Title: "Fill Matrix & Save",
                    step4Desc: "Score each alternative based on the criteria. When finished, you <strong>must click \"Save All Scores\"</strong>.",
                    step5Title: "Calculate & Analyze",
                    step5Desc: "Click the \"Calculate & Show Ranking\" button to see the final results, ranks, and best recommendation.",
                    decisionTitleLabel: "Your Decision Title",
                    decisionTitlePlaceholder: "Example: Best Smartphone of 2025",
                    criteriaTitle: "1. Input Criteria & Weights",
                    criteriaNameLabel: "Criterion Name",
                    weightLabel: "Weight (Total must be 100)",
                    typeLabel: "Attribute Type",
                    benefitOption: "Benefit (Higher is better)",
                    costOption: "Cost (Lower is better)",
                    addCriterionButton: "Add Criterion",
                    alternativesTitle: "2. Input Alternatives",
                    alternativeNameLabel: "Alternative Name",
                    alternativesListTitle: "List of Alternatives",
                    matrixTitle: "3. Input Decision Matrix",
                    matrixDesc: "Enter a value for each alternative against each criterion, then click \"Save Scores\" before calculating.",
                    saveScoresButton: "Save All Scores",
                    resultsTitle: "4. SAW Calculation Process & Results",
                    calculateButton: "Calculate & Show Ranking",
                    rankingTitle: "Ranking Results:",
                    criteriaListTitle: "Your Criteria List",
                    summaryTitle: "Conclusion & Recommendation",
                    summaryPlaceholder: "The conclusion will appear here after the calculation is performed.",
                    resetTitle: "Start Over?",
                    resetDesc: "This action will delete all the data you have entered.",
                    resetButton: "Reset All Data",
                    nameHeader: "Name",
                    weightHeader: "Weight",
                    typeHeader: "Type",
                    rankHeader: "Rank",
                    alternativeHeader: "Alternative",
                    sawScoreHeader: "SAW Score",
                    footerText: "© {year} DSS Application with SAW Method. Created by {author}.",
                    remainingWeightInfo: "Remaining: {value} of {total}.",
                    weightGoalReached: "Total weight has reached {total}. Ready to calculate.",
                    weightExceeded: "Total weight ({current}) exceeds target {total}.",
                    toastCriterionAdded: "Criterion '{name}' added successfully.",
                    toastAlternativeAdded: "Alternative '{name}' added successfully.",
                    toastScoresSaved: "All scores saved successfully.",
                    toastSaveFailed: "Failed to save scores, check invalid inputs.",
                    toastCalculationSuccess: "SAW calculation successful!",
                    toastGenericError: "Invalid input!",
                    confirmReset: "Are you sure you want to reset all data? This action cannot be undone.",
                    errorCriterionName: "Criterion name cannot be empty.",
                    errorWeightPositive: "Weight must be a positive number.",
                    errorCriterionExists: "Criterion '{name}' already exists.",
                    errorWeightBudget: "Weight exceeds the remaining budget.",
                    errorAlternativeName: "Alternative name cannot be empty.",
                    errorAlternativeExists: "Alternative '{name}' already exists.",
                    errorInvalidScore: "The score for {altName} - {critName} is invalid. Please enter numbers only.",
                    errorEmptyScore: "The score for {altName} - {critName} cannot be empty.",
                    errorNoCriteria: "Please add criteria first.",
                    errorNoAlternatives: "Please add alternatives first.",
                    errorWeightTotal: "Total weight must be exactly {total}.",
                    errorScoresNotSaved: "The score for {altName} - {critName} has not been saved.",
                    summaryBestIs: "Based on the calculation, the best alternative is",
                    summaryWithValue: "with the highest preference value of",
                    summaryForDecision: "for the decision <strong>\"{title}\"</strong>",
                    summaryRecommendationTitle: "Best Recommendation",
                    summaryConsiderationTitle: "Consideration Details:",
                    summaryScoreForCriterion: "<li>For the <strong>{critName}</strong> criterion, the score is <strong>{score}</strong>.",
                    summaryOutperformed: "<span class=\"text-xs opacity-80\">(Alternative <strong>{performers}</strong> performed better here with a score of <strong>{bestScore}</strong>).</span>",
                    noCriteria: "No criteria added.",
                    noAlternatives: "No alternatives added.",
                    noMatrix: "Please add criteria and alternatives to fill the score matrix.",
                    noResults: "No results to display. Check your score inputs.",
                },
                id: {
                    welcomeTitle: "Selamat Datang!",
                    welcomeSubtitle: "Aplikasi ini dirancang untuk membantu Anda mengambil keputusan kompleks menggunakan metode <strong class=\"text-primary\">Simple Additive Weighting (SAW)</strong>. Definisikan kriteria, beri bobot, nilai alternatif, dan dapatkan peringkat akhir yang objektif.",
                    guideTitle: "Panduan Lengkap Penggunaan",
                    step1Title: "Tentukan Judul",
                    step1Desc: "Isi judul yang jelas untuk memberikan konteks pada analisis Anda. Contoh: \"Pemilihan Laptop Desain\".",
                    step2Title: "Input Kriteria",
                    step2Desc: "Tentukan faktor penentu. <strong>Bobot</strong> menandakan tingkat kepentingan (total harus <strong>100</strong>). Pilih jenis <strong>Benefit</strong> (lebih tinggi lebih baik) atau <strong>Cost</strong> (lebih rendah lebih baik).",
                    step3Title: "Input Alternatif",
                    step3Desc: "Daftarkan semua pilihan yang akan dievaluasi. Contoh: \"Laptop A\", \"Laptop B\", \"Laptop C\".",
                    step4Title: "Isi Matriks & Simpan",
                    step4Desc: "Beri skor pada setiap alternatif berdasarkan kriteria. Setelah selesai, <strong>wajib klik \"Simpan Semua Skor\"</strong>.",
                    step5Title: "Hitung & Analisis",
                    step5Desc: "Klik tombol \"Hitung & Tampilkan Peringkat\" untuk melihat hasil akhir, peringkat, dan rekomendasi terbaik.",
                    decisionTitleLabel: "Judul Keputusan Anda",
                    decisionTitlePlaceholder: "Contoh: Pemilihan Smartphone Terbaik 2025",
                    criteriaTitle: "1. Input Kriteria & Bobot",
                    criteriaNameLabel: "Nama Kriteria",
                    weightLabel: "Bobot (Total Harus 100)",
                    typeLabel: "Jenis Atribut",
                    benefitOption: "Benefit (Makin besar makin baik)",
                    costOption: "Cost (Makin kecil makin baik)",
                    addCriterionButton: "Tambah Kriteria",
                    alternativesTitle: "2. Input Alternatif",
                    alternativeNameLabel: "Nama Alternatif",
                    alternativesListTitle: "Daftar Alternatif:",
                    matrixTitle: "3. Input Matriks Keputusan",
                    matrixDesc: "Masukkan nilai untuk setiap alternatif, lalu klik \"Simpan Skor\" sebelum menghitung.",
                    saveScoresButton: "Simpan Semua Skor",
                    resultsTitle: "4. Proses Perhitungan & Hasil",
                    calculateButton: "Hitung & Tampilkan Peringkat",
                    rankingTitle: "Hasil Peringkat:",
                    criteriaListTitle: "Daftar Kriteria Anda",
                    summaryTitle: "Kesimpulan & Rekomendasi",
                    summaryPlaceholder: "Kesimpulan akan muncul di sini setelah perhitungan dilakukan.",
                    resetTitle: "Mulai Ulang?",
                    resetDesc: "Aksi ini akan menghapus semua data yang telah Anda masukkan.",
                    resetButton: "Reset Semua Data",
                    nameHeader: "Nama",
                    weightHeader: "Bobot",
                    typeHeader: "Jenis",
                    rankHeader: "Peringkat",
                    alternativeHeader: "Alternatif",
                    sawScoreHeader: "Nilai SAW",
                    footerText: "© {year} Aplikasi SPK Metode SAW. Dibuat oleh {author}.",
                    remainingWeightInfo: "Sisa: {value} dari {total}.",
                    weightGoalReached: "Total bobot sudah mencapai {total}. Siap untuk menghitung.",
                    weightExceeded: "Total bobot ({current}) melebihi target {total}.",
                    toastCriterionAdded: "Kriteria '{name}' berhasil ditambahkan.",
                    toastAlternativeAdded: "Alternatif '{name}' berhasil ditambahkan.",
                    toastScoresSaved: "Semua skor berhasil disimpan.",
                    toastSaveFailed: "Gagal menyimpan skor, periksa input yang salah.",
                    toastCalculationSuccess: "Perhitungan SAW berhasil!",
                    toastGenericError: "Input tidak valid!",
                    confirmReset: "Apakah Anda yakin ingin mereset semua data? Aksi ini tidak dapat dibatalkan.",
                    errorCriterionName: "Nama kriteria tidak boleh kosong.",
                    errorWeightPositive: "Bobot harus angka positif.",
                    errorCriterionExists: "Kriteria '{name}' sudah ada.",
                    errorWeightBudget: "Bobot melebihi sisa budget.",
                    errorAlternativeName: "Nama alternatif tidak boleh kosong.",
                    errorAlternativeExists: "Alternatif '{name}' sudah ada.",
                    errorInvalidScore: "Nilai untuk {altName} - {critName} tidak valid. Harap isi dengan angka.",
                    errorEmptyScore: "Skor untuk {altName} - {critName} tidak boleh kosong.",
                    errorNoCriteria: "Mohon tambahkan kriteria terlebih dahulu.",
                    errorNoAlternatives: "Mohon tambahkan alternatif terlebih dahulu.",
                    errorWeightTotal: "Total bobot harus tepat {total}.",
                    errorScoresNotSaved: "Skor untuk {altName} - {critName} belum disimpan.",
                    summaryBestIs: "Berdasarkan perhitungan, alternatif terbaik adalah",
                    summaryWithValue: "dengan nilai preferensi tertinggi sebesar",
                    summaryForDecision: "untuk keputusan <strong>\"{title}\"</strong>",
                    summaryRecommendationTitle: "Rekomendasi Terbaik",
                    summaryConsiderationTitle: "Detail Pertimbangan:",
                    summaryScoreForCriterion: "<li>Pada kriteria <strong>{critName}</strong>, skornya adalah <strong>{score}</strong>.",
                    summaryOutperformed: "<span class=\"text-xs opacity-80\">(Alternatif <strong>{performers}</strong> lebih unggul di sini dengan skor <strong>{bestScore}</strong>).</span>",
                    noCriteria: "Belum ada kriteria ditambahkan.",
                    noAlternatives: "Belum ada alternatif ditambahkan.",
                    noMatrix: "Silakan tambahkan kriteria dan alternatif untuk mengisi matriks skor.",
                    noResults: "Tidak ada hasil peringkat. Periksa input skor Anda.",
                }
            };

            let currentLanguage = localStorage.getItem('language') || 'id';

            const langToggleBtn = document.getElementById('lang-toggle');
            
            const decisionTitleInput = document.getElementById('decision_title');
            const formKriteria = document.getElementById('formKriteria');
            const criterionWeightInput = document.getElementById('criterion_weight');
            const remainingWeightInfoSpan = document.getElementById('remainingWeightInfo');
            const addCriterionButton = document.getElementById('addCriterionButton');
            const tabelKriteriaBody = document.querySelector('#tabelKriteria tbody');
            const criteriaErrorDiv = document.getElementById('criteriaError');
            const formAlternatif = document.getElementById('formAlternatif');
            const daftarAlternatifUl = document.getElementById('daftarAlternatif');
            const alternativesErrorDiv = document.getElementById('alternativesError');
            const tabelMatriksKeputusanHead = document.querySelector('#tabelMatriksKeputusan thead');
            const tabelMatriksKeputusanBody = document.querySelector('#tabelMatriksKeputusan tbody');
            const matriksErrorDiv = document.getElementById('matriksError');
            const saveScoresButton = document.getElementById('saveScoresButton');
            const saveScoresMessageDiv = document.getElementById('saveScoresMessage');
            const hitungSawButton = document.getElementById('hitungSawButton');
            const tabelHasilBody = document.querySelector('#tabelHasil tbody');
            const calculationErrorDiv = document.getElementById('calculationError');
            const resetAllButton = document.getElementById('resetAllButton');
            const toastContainer = document.getElementById('toast-container');
            const summarySectionContent = document.getElementById('summarySectionContent');
            document.getElementById('currentYear').textContent = new Date().getFullYear();

            const totalWeightCap = 100;
            let currentAllocatedWeight = 0;
            let currentDecisionTitle = "";
            let criteria = [];
            let alternatives = [];

            function translatePage(lang) {
                document.querySelectorAll('[data-lang-key]').forEach(el => {
                    const key = el.dataset.langKey;
                    const translation = translations[lang][key];
                    if (translation) {
                        if (el.tagName === 'INPUT' && el.placeholder) {
                            el.placeholder = translation;
                        } else {
                            el.innerHTML = translation;
                        }
                    }
                });
                updateWeightInputState();
                renderCriteriaTable();
                renderAlternativesList();
            }
            
            langToggleBtn.addEventListener('click', () => {
                currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
                langToggleBtn.textContent = currentLanguage === 'id' ? 'EN' : 'ID';
                localStorage.setItem('language', currentLanguage);
                translatePage(currentLanguage);
            });

            langToggleBtn.textContent = currentLanguage === 'id' ? 'EN' : 'ID';
            
            translatePage(currentLanguage);

            decisionTitleInput.addEventListener('input', function (event) {
                currentDecisionTitle = event.target.value.trim();
            });

            formKriteria.addEventListener('submit', handleAddCriterion);
            formAlternatif.addEventListener('submit', handleAddAlternative);
            saveScoresButton.addEventListener('click', handleSaveScores);
            hitungSawButton.addEventListener('click', handleCalculateSAW);
            resetAllButton.addEventListener('click', handleResetAll);

            function updateWeightInputState() {
                const remainingBudget = parseFloat((totalWeightCap - currentAllocatedWeight).toFixed(10));
                criterionWeightInput.max = Math.max(0, remainingBudget).toFixed(10);
                const budgetIsFullOrExceeded = remainingBudget <= 1e-9;
                const budgetExactlyMet = Math.abs(currentAllocatedWeight - totalWeightCap) < 1e-9;
                criterionWeightInput.disabled = budgetIsFullOrExceeded;
                addCriterionButton.disabled = budgetIsFullOrExceeded;
                const allScoresSaved = alternatives.every(alt => 
                    criteria.every(crit => alt.scores[crit.name] !== undefined)
                );
                hitungSawButton.disabled = !(criteria.length > 0 && alternatives.length > 0 && budgetExactlyMet && allScoresSaved);
                if (budgetExactlyMet) {
                    remainingWeightInfoSpan.textContent = translations[currentLanguage].weightGoalReached.replace('{total}', totalWeightCap);
                    remainingWeightInfoSpan.className = 'text-xs text-emerald-600 mt-1.5 block font-medium';
                } else if (currentAllocatedWeight > totalWeightCap) {
                    remainingWeightInfoSpan.textContent = translations[currentLanguage].weightExceeded.replace('{current}', currentAllocatedWeight.toFixed(2)).replace('{total}', totalWeightCap);
                    remainingWeightInfoSpan.className = 'text-xs text-rose-500 mt-1.5 block font-medium';
                } else {
                    remainingWeightInfoSpan.textContent = translations[currentLanguage].remainingWeightInfo.replace('{value}', remainingBudget.toFixed(2)).replace('{total}', totalWeightCap);
                    remainingWeightInfoSpan.className = 'text-xs text-slate-500 mt-1.5 block';
                }
            }

            function showToast(message, type = 'success') {
                const toast = document.createElement('div');
                const icon = type === 'success' ? '✓' : '×';
                const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-rose-500';
                toast.className = `toast p-4 rounded-lg text-white mb-3 w-full flex items-center gap-3 ${bgColor}`;
                toast.innerHTML = `<span class="font-bold text-lg">${icon}</span><span>${message}</span>`;
                toastContainer.appendChild(toast);
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(20px)';
                    setTimeout(() => toast.remove(), 300);
                }, 2700);
            }
            
            function renderCriteriaTable() {
                tabelKriteriaBody.innerHTML = '';
                if (criteria.length === 0) {
                    tabelKriteriaBody.innerHTML = `<tr><td colspan="3" class="px-6 py-4 text-center text-sm text-slate-500 italic">${translations[currentLanguage].noCriteria}</td></tr>`;
                } else {
                    criteria.forEach(c => {
                        const row = tabelKriteriaBody.insertRow();
                        row.className = "hover:bg-slate-50 transition-colors duration-150 text-sm";
                        row.insertCell().textContent = c.name;
                        row.insertCell().textContent = c.weight;
                        row.insertCell().textContent = c.type.charAt(0).toUpperCase() + c.type.slice(1);
                    });
                }
                renderScoreMatrix();
                updateWeightInputState();
            }

            function renderAlternativesList() {
                daftarAlternatifUl.innerHTML = '';
                if (alternatives.length === 0) {
                    daftarAlternatifUl.innerHTML = `<li class="text-sm text-slate-500 italic">${translations[currentLanguage].noAlternatives}</li>`;
                } else {
                    alternatives.forEach(alt => {
                        const li = document.createElement('li');
                        li.className = "text-sm";
                        li.textContent = alt.name;
                        daftarAlternatifUl.appendChild(li);
                    });
                }
                renderScoreMatrix();
                updateWeightInputState();
            }

            function renderScoreMatrix() {
                tabelMatriksKeputusanHead.innerHTML = '';
                tabelMatriksKeputusanBody.innerHTML = '';
                matriksErrorDiv.textContent = '';
                if (criteria.length === 0 || alternatives.length === 0) {
                    tabelMatriksKeputusanHead.innerHTML = `<tr><td class="px-6 py-10 text-center text-sm text-slate-500 italic" colspan="100%">${translations[currentLanguage].noMatrix}</td></tr>`;
                    saveScoresButton.classList.add('hidden');
                     document.querySelector('[data-lang-key="summaryPlaceholder"]').textContent = translations[currentLanguage].summaryPlaceholder;
                    hitungSawButton.disabled = true;
                    return;
                }
                saveScoresButton.classList.remove('hidden');
                const headerRow = tabelMatriksKeputusanHead.insertRow();
                const thAlt = document.createElement('th');
                thAlt.className = "px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider";
                thAlt.textContent = translations[currentLanguage].alternativeHeader;
                headerRow.appendChild(thAlt);
                criteria.forEach(c => {
                    const thCrit = document.createElement('th');
                    thCrit.className = "px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider";
                    thCrit.textContent = c.name;
                    headerRow.appendChild(thCrit);
                });
                alternatives.forEach(alt => {
                    const altRow = tabelMatriksKeputusanBody.insertRow();
                    altRow.className = "hover:bg-slate-50 transition-colors duration-150";
                    const cellAltName = altRow.insertCell();
                    cellAltName.className = "px-6 py-4 whitespace-nowrap text-sm font-medium";
                    cellAltName.textContent = alt.name;
                    criteria.forEach(crit => {
                        const cell = altRow.insertCell();
                        cell.className = "px-6 py-4 whitespace-nowrap text-sm";
                        const input = document.createElement('input');
                        input.type = 'number';
                        input.step = 'any';
                        input.className = 'input-field score-input block w-24 px-3 py-2 sm:text-sm';
                        input.dataset.altName = alt.name;
                        input.dataset.critName = crit.name;
                        input.value = alt.scores[crit.name] !== undefined ? alt.scores[crit.name] : '';
                        input.placeholder = "0";
                        cell.appendChild(input);
                    });
                });
                updateWeightInputState();
            }

            function renderResultsTable(results) {
                tabelHasilBody.innerHTML = '';
                summarySectionContent.innerHTML = '';
                calculationErrorDiv.textContent = '';
                if (!results || results.length === 0) {
                     tabelHasilBody.innerHTML = `<tr><td colspan="3" class="px-6 py-4 text-center text-sm text-slate-500 italic">${translations[currentLanguage].noResults}</td></tr>`;
                     summarySectionContent.innerHTML = `<p class="italic text-sm text-slate-500">${translations[currentLanguage].summaryPlaceholder.replace('dilakukan.', 'tidak ada hasil.')}</p>`;
                    return;
                }
                results.forEach(res => {
                    const row = tabelHasilBody.insertRow();
                    row.className = res.rank === 1 ? "highlight-row" : "hover:bg-slate-50";
                    const rankCell = row.insertCell();
                    rankCell.className = "px-6 py-4 whitespace-nowrap text-sm font-medium " + (res.rank === 1 ? "highlight-text" : "");
                    rankCell.textContent = res.rank;
                    const nameCell = row.insertCell();
                    nameCell.className = "px-6 py-4 whitespace-nowrap text-sm " + (res.rank === 1 ? "highlight-text font-semibold" : "");
                    nameCell.textContent = res.alternativeName;
                    const scoreCell = row.insertCell();
                    scoreCell.className = "px-6 py-4 whitespace-nowrap text-sm " + (res.rank === 1 ? "highlight-text font-semibold" : "text-slate-500");
                    scoreCell.textContent = res.sawScore.toFixed(4);
                });
                const bestAlternative = results[0];
                const bestAlternativeDetails = alternatives.find(alt => alt.name === bestAlternative.alternativeName);
                let considerationDetailsHTML = '<ul class="list-disc list-inside mt-2 space-y-1 text-sm">';
                criteria.forEach(crit => {
                    const currentAltScoreForCrit = bestAlternativeDetails.scores[crit.name];
                    let bestPossibleScoreOnThisCrit;
                    let topPerformersOnThisCrit = [];
                    const allScoresForCrit = alternatives.map(alt => alt.scores[crit.name]);
                    if (crit.type === 'benefit') {
                        bestPossibleScoreOnThisCrit = Math.max(...allScoresForCrit);
                    } else {
                        bestPossibleScoreOnThisCrit = Math.min(...allScoresForCrit);
                    }
                    topPerformersOnThisCrit = alternatives.filter(alt => Math.abs(alt.scores[crit.name] - bestPossibleScoreOnThisCrit) < 1e-9).map(alt => alt.name);
                    let scoreInfo = translations[currentLanguage].summaryScoreForCriterion.replace('{critName}', crit.name).replace('{score}', currentAltScoreForCrit ?? 'N/A');
                    if (!topPerformersOnThisCrit.includes(bestAlternative.alternativeName)) {
                        scoreInfo += " " + translations[currentLanguage].summaryOutperformed.replace('{performers}', topPerformersOnThisCrit.join(', ')).replace('{bestScore}', bestPossibleScoreOnThisCrit);
                    }
                    scoreInfo += '</li>';
                    considerationDetailsHTML += scoreInfo;
                });
                considerationDetailsHTML += '</ul>';
                const decisionContext = currentDecisionTitle ? " " + translations[currentLanguage].summaryForDecision.replace('{title}', currentDecisionTitle) : "";
                summarySectionContent.innerHTML = `
                    <h4 class="font-semibold text-lg mb-2 text-text">${translations[currentLanguage].summaryRecommendationTitle}${decisionContext}:</h4>
                    <p class="text-sm">${translations[currentLanguage].summaryBestIs}
                        <strong class="font-bold text-emerald-600">${bestAlternative.alternativeName}</strong>
                        ${translations[currentLanguage].summaryWithValue}
                        <strong class="font-bold text-emerald-600">${bestAlternative.sawScore.toFixed(4)}</strong>.
                    </p>
                    <hr class="my-3 border-slate-200">
                    <h5 class="font-semibold text-md mb-1 text-text">${translations[currentLanguage].summaryConsiderationTitle}</h5>
                    ${considerationDetailsHTML}
                `;
            }
            
            function handleAddCriterion(event) {
                event.preventDefault();
                criteriaErrorDiv.textContent = '';
                const name = formKriteria.criterion_name.value.trim();
                const weight = parseFloat(criterionWeightInput.value);
                const type = formKriteria.criterion_type.value;
                if (!name) { criteriaErrorDiv.textContent = translations[currentLanguage].errorCriterionName; }
                else if (isNaN(weight) || weight <= 0) { criteriaErrorDiv.textContent = translations[currentLanguage].errorWeightPositive; }
                else if (criteria.find(c => c.name.toLowerCase() === name.toLowerCase())) { criteriaErrorDiv.textContent = translations[currentLanguage].errorCriterionExists.replace('{name}', name); }
                else if (weight > parseFloat((totalWeightCap - currentAllocatedWeight).toFixed(10)) + 1e-9) { criteriaErrorDiv.textContent = translations[currentLanguage].errorWeightBudget; }
                else {
                    criteria.push({ name, weight, type });
                    currentAllocatedWeight = parseFloat((currentAllocatedWeight + weight).toFixed(10));
                    alternatives.forEach(alt => { alt.scores[name] = undefined; });
                    renderCriteriaTable();
                    formKriteria.reset();
                    criterionWeightInput.value = '';
                    updateWeightInputState();
                    showToast(translations[currentLanguage].toastCriterionAdded.replace('{name}', name));
                    return;
                }
                showToast(translations[currentLanguage].toastGenericError, 'error');
            }

            function handleAddAlternative(event) {
                event.preventDefault();
                alternativesErrorDiv.textContent = '';
                const name = formAlternatif.alternative_name.value.trim();
                if (!name) { alternativesErrorDiv.textContent = translations[currentLanguage].errorAlternativeName; }
                else if (alternatives.find(alt => alt.name.toLowerCase() === name.toLowerCase())) { alternativesErrorDiv.textContent = translations[currentLanguage].errorAlternativeExists.replace('{name}', name); }
                else {
                    const newAlternative = { name, scores: {} };
                    criteria.forEach(c => { newAlternative.scores[c.name] = undefined; });
                    alternatives.push(newAlternative);
                    renderAlternativesList();
                    formAlternatif.reset();
                    showToast(translations[currentLanguage].toastAlternativeAdded.replace('{name}', name));
                    return;
                }
                showToast(translations[currentLanguage].toastGenericError, 'error');
            }

            function handleSaveScores() {
                matriksErrorDiv.textContent = '';
                saveScoresMessageDiv.textContent = '';
                let allScoresValid = true;
                document.querySelectorAll('.score-input').forEach(input => {
                    const altName = input.dataset.altName;
                    const critName = input.dataset.critName;
                    if (input.value.trim() === '') {
                        matriksErrorDiv.textContent = translations[currentLanguage].errorEmptyScore.replace('{altName}', altName).replace('{critName}', critName);
                        input.classList.add('input-error');
                        allScoresValid = false; return;
                    }
                    const value = parseFloat(input.value);
                    if (isNaN(value)) {
                        matriksErrorDiv.textContent = translations[currentLanguage].errorInvalidScore.replace('{altName}', altName).replace('{critName}', critName);
                        input.classList.add('input-error');
                        allScoresValid = false; return;
                    }
                    input.classList.remove('input-error');
                    const alternative = alternatives.find(alt => alt.name === altName);
                    if (alternative) { alternative.scores[critName] = value; }
                });
                if (allScoresValid) {
                    showToast(translations[currentLanguage].toastScoresSaved);
                } else {
                    showToast(translations[currentLanguage].toastSaveFailed, 'error');
                }
                updateWeightInputState();
            }

            function handleCalculateSAW() {
                calculationErrorDiv.textContent = '';
                if (criteria.length === 0 ) {
                     calculationErrorDiv.textContent = translations[currentLanguage].errorNoCriteria;
                     showToast(translations[currentLanguage].errorNoCriteria, 'error'); return;
                }
                if (alternatives.length === 0 ) {
                     calculationErrorDiv.textContent = translations[currentLanguage].errorNoAlternatives;
                     showToast(translations[currentLanguage].errorNoAlternatives, 'error'); return;
                }
                if (Math.abs(currentAllocatedWeight - totalWeightCap) > 1e-9) {
                    calculationErrorDiv.textContent = translations[currentLanguage].errorWeightTotal.replace('{total}', totalWeightCap);
                    showToast(calculationErrorDiv.textContent, 'error'); return;
                }
                 for (const alt of alternatives) {
                    for (const crit of criteria) {
                        if (alt.scores[crit.name] === undefined || isNaN(parseFloat(alt.scores[crit.name]))) {
                            calculationErrorDiv.textContent = translations[currentLanguage].errorScoresNotSaved.replace('{altName}', alt.name).replace('{critName}', crit.name);
                            showToast(calculationErrorDiv.textContent, 'error'); return;
                        }
                    }
                }
                const totalEnteredWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
                const normalizedWeights = {};
                criteria.forEach(c => { normalizedWeights[c.name] = c.weight / totalEnteredWeight; });
                const normalizedDecisionMatrix = alternatives.map(alt => ({ name: alt.name, normalizedScores: {} }));
                criteria.forEach(crit => {
                    const critScores = alternatives.map(alt => alt.scores[crit.name]);
                    if (crit.type === 'benefit') {
                        const maxVal = Math.max(...critScores);
                        alternatives.forEach((alt, index) => {
                            normalizedDecisionMatrix[index].normalizedScores[crit.name] = maxVal === 0 ? 0 : alt.scores[crit.name] / maxVal;
                        });
                    } else {
                        const minVal = Math.min(...critScores);
                        alternatives.forEach((alt, index) => {
                             if(alt.scores[crit.name] === 0) {
                                normalizedDecisionMatrix[index].normalizedScores[crit.name] = 0;
                             } else {
                                normalizedDecisionMatrix[index].normalizedScores[crit.name] = minVal / alt.scores[crit.name];
                             }
                        });
                    }
                });
                const sawResults = normalizedDecisionMatrix.map(altData => {
                    let sawScore = 0;
                    criteria.forEach(crit => {
                        sawScore += altData.normalizedScores[crit.name] * normalizedWeights[crit.name];
                    });
                    return { alternativeName: altData.name, sawScore };
                });
                sawResults.sort((a, b) => b.sawScore - a.sawScore);
                sawResults.forEach((res, index) => { res.rank = index + 1; });
                renderResultsTable(sawResults);
                showToast(translations[currentLanguage].toastCalculationSuccess);
            }

            function handleResetAll() {
                if (confirm(translations[currentLanguage].confirmReset)) {
                    localStorage.removeItem('language');
                    window.location.reload();
                }
            }
        });
    </script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0891b2', 
                        secondary: '#475569', 
                        background: '#f1f5f9', 
                        card: '#ffffff',
                        text: '#1e293b', 
                    }
                }
            }
        }
