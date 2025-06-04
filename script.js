document.addEventListener('DOMContentLoaded', function() {
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

            decisionTitleInput.addEventListener('input', function(event) {
                currentDecisionTitle = event.target.value.trim();
            });

            function updateWeightInputState() {
                const remainingBudget = parseFloat((totalWeightCap - currentAllocatedWeight).toFixed(10));
                criterionWeightInput.max = Math.max(0, remainingBudget).toFixed(10); 

                const budgetIsFullOrExceeded = remainingBudget <= 1e-9; 
                const budgetExactlyMet = Math.abs(currentAllocatedWeight - totalWeightCap) < 1e-9;

                criterionWeightInput.disabled = budgetIsFullOrExceeded;
                addCriterionButton.disabled = budgetIsFullOrExceeded;
                
                hitungSawButton.disabled = !(criteria.length > 0 && alternatives.length > 0 && budgetExactlyMet);


                criterionWeightInput.classList.toggle('opacity-50', budgetIsFullOrExceeded);
                criterionWeightInput.classList.toggle('cursor-not-allowed', budgetIsFullOrExceeded);
                criterionWeightInput.classList.toggle('bg-gray-100', budgetIsFullOrExceeded);


                addCriterionButton.classList.toggle('opacity-50', budgetIsFullOrExceeded);
                addCriterionButton.classList.toggle('cursor-not-allowed', budgetIsFullOrExceeded);
                
                if(budgetIsFullOrExceeded){
                    addCriterionButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                    addCriterionButton.classList.add('bg-gray-400', 'hover:bg-gray-400');
                } else {
                     addCriterionButton.classList.remove('bg-gray-400', 'hover:bg-gray-400');
                     addCriterionButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
                }

                if (budgetExactlyMet) {
                    remainingWeightInfoSpan.textContent = `Total bobot sudah mencapai ${totalWeightCap}. Siap untuk menghitung.`;
                    remainingWeightInfoSpan.className = 'text-xs text-green-600 mt-1.5 block font-medium';
                    addCriterionButton.disabled = true; 
                    criterionWeightInput.disabled = true;
                    addCriterionButton.classList.add('opacity-50', 'cursor-not-allowed', 'bg-gray-400', 'hover:bg-gray-400');
                    addCriterionButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');

                } else if (currentAllocatedWeight > totalWeightCap) {
                    remainingWeightInfoSpan.textContent = `Total bobot (${currentAllocatedWeight.toFixed(2)}) melebihi target ${totalWeightCap}. Harap perbaiki.`;
                    remainingWeightInfoSpan.className = 'text-xs text-rose-500 mt-1.5 block font-medium';
                } else { 
                    remainingWeightInfoSpan.textContent = `Sisa budget: ${remainingBudget.toFixed(2)} dari ${totalWeightCap}. (Maks input: ${parseFloat(criterionWeightInput.max).toFixed(2)})`;
                    remainingWeightInfoSpan.className = 'text-xs text-gray-500 mt-1.5 block';
                }
            }


            function showToast(message, type = 'success') {
                const toast = document.createElement('div');
                toast.className = `toast p-4 rounded-lg text-white mb-3 w-full ${type === 'success' ? 'bg-green-500' : 'bg-rose-500'}`;
                toast.textContent = message;
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
                    tabelKriteriaBody.innerHTML = '<tr><td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500 italic">Belum ada kriteria ditambahkan.</td></tr>';
                } else {
                    criteria.forEach(c => {
                        const row = tabelKriteriaBody.insertRow();
                        row.className = "table-row-hover transition-colors duration-150";
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
                    daftarAlternatifUl.innerHTML = '<li class="text-sm text-gray-500 italic">Belum ada alternatif ditambahkan.</li>';
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
                    tabelMatriksKeputusanHead.innerHTML = '<tr><td class="px-6 py-10 text-center text-sm text-gray-500 italic" colspan="100%">Silakan tambahkan kriteria dan alternatif terlebih dahulu untuk mengisi matriks skor.</td></tr>';
                    saveScoresButton.classList.add('hidden');
                    summarySectionContent.innerHTML = '<p class="italic text-sm">Kesimpulan akan muncul di sini setelah perhitungan dilakukan.</p>';
                    summarySectionContent.classList.add('hidden'); 
                    hitungSawButton.disabled = true;
                    return;
                }
                saveScoresButton.classList.remove('hidden');
                summarySectionContent.classList.remove('hidden'); 
                summarySectionContent.innerHTML = '<p class="italic text-sm">Kesimpulan akan muncul di sini setelah perhitungan dilakukan.</p>';

                const headerRow = tabelMatriksKeputusanHead.insertRow();
                const thAlt = document.createElement('th');
                thAlt.className = "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider";
                thAlt.textContent = 'Alternatif';
                headerRow.appendChild(thAlt);

                criteria.forEach(c => {
                    const thCrit = document.createElement('th');
                    thCrit.className = "px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider";
                    thCrit.textContent = c.name;
                    headerRow.appendChild(thCrit);
                });

                alternatives.forEach(alt => {
                    const altRow = tabelMatriksKeputusanBody.insertRow();
                    altRow.className = "table-row-hover transition-colors duration-150";
                    const cellAltName = altRow.insertCell();
                    cellAltName.className = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800";
                    cellAltName.textContent = alt.name;

                    criteria.forEach(crit => {
                        const cell = altRow.insertCell();
                        cell.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-700";
                        const input = document.createElement('input');
                        input.type = 'number';
                        input.step = 'any';
                        input.className = 'input-field score-input mt-1 block w-20 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-all duration-150 ease-in-out hover:shadow-sm';
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
                    calculationErrorDiv.textContent = 'Tidak ada hasil untuk ditampilkan.';
                    summarySectionContent.innerHTML = '<p class="italic text-sm">Tidak ada kesimpulan karena tidak ada hasil.</p>';
                     if (criteria.length > 0 && alternatives.length > 0) {
                        tabelHasilBody.innerHTML = '<tr><td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500 italic">Tidak ada hasil peringkat yang dapat ditampilkan. Periksa input skor Anda.</td></tr>';
                    }
                    return;
                }
                
                results.forEach(res => {
                    const row = tabelHasilBody.insertRow();
                    row.className = res.rank === 1 ? "highlight-row" : "table-row-hover";
                    const rankCell = row.insertCell();
                    rankCell.className = "px-6 py-4 whitespace-nowrap text-sm font-medium " + (res.rank === 1 ? "highlight-text" : "text-gray-800");
                    rankCell.textContent = res.rank;
                    
                    const nameCell = row.insertCell();
                    nameCell.className = "px-6 py-4 whitespace-nowrap text-sm " + (res.rank === 1 ? "highlight-text font-semibold" : "text-gray-700");
                    nameCell.textContent = res.alternativeName;

                    const scoreCell = row.insertCell();
                    scoreCell.className = "px-6 py-4 whitespace-nowrap text-sm " + (res.rank === 1 ? "highlight-text font-semibold" : "text-gray-500");
                    scoreCell.textContent = res.sawScore.toFixed(4); 
                });

                if (results.length > 0) {
                    const bestAlternative = results[0]; 
                    const bestAlternativeDetails = alternatives.find(alt => alt.name === bestAlternative.alternativeName);
                    let considerationDetailsHTML = '<ul class="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">';

                    criteria.forEach(crit => {
                        const currentAltScoreForCrit = bestAlternativeDetails.scores[crit.name];
                        let bestPossibleScoreOnThisCrit;
                        let topPerformersOnThisCrit = [];

                        if (crit.type === 'benefit') {
                            bestPossibleScoreOnThisCrit = -Infinity;
                            alternatives.forEach(alt => {
                                const score = alt.scores[crit.name];
                                if (score > bestPossibleScoreOnThisCrit) {
                                    bestPossibleScoreOnThisCrit = score;
                                    topPerformersOnThisCrit = [alt.name];
                                } else if (score === bestPossibleScoreOnThisCrit) {
                                    topPerformersOnThisCrit.push(alt.name);
                                }
                            });
                        } else { 
                            bestPossibleScoreOnThisCrit = Infinity;
                            alternatives.forEach(alt => {
                                const score = alt.scores[crit.name];
                                if (score < bestPossibleScoreOnThisCrit) {
                                    bestPossibleScoreOnThisCrit = score;
                                    topPerformersOnThisCrit = [alt.name];
                                } else if (score === bestPossibleScoreOnThisCrit) {
                                    topPerformersOnThisCrit.push(alt.name);
                                }
                            });
                        }

                        let scoreInfo = `<li>Pada kriteria <strong>${crit.name}</strong> (${crit.type}), skor yang diperoleh adalah: <strong>${currentAltScoreForCrit !== undefined ? currentAltScoreForCrit : 'N/A'}</strong>.`;
                        
                        const isCurrentAltTopForCrit = topPerformersOnThisCrit.includes(bestAlternative.alternativeName) && Math.abs(currentAltScoreForCrit - bestPossibleScoreOnThisCrit) < 1e-9;

                        if (Math.abs(currentAltScoreForCrit - bestPossibleScoreOnThisCrit) > 1e-9) {
                            if (topPerformersOnThisCrit.length > 0) {
                                 scoreInfo += ` <span class="text-xs text-gray-500">(Catatan: Alternatif <strong>${topPerformersOnThisCrit.join(', ')}</strong> lebih unggul pada kriteria ini dengan skor <strong>${bestPossibleScoreOnThisCrit}</strong>).</span>`;
                            }
                        } else if (isCurrentAltTopForCrit && topPerformersOnThisCrit.length > 1) {
                            const otherSharedTopPerformers = topPerformersOnThisCrit.filter(name => name !== bestAlternative.alternativeName);
                            if (otherSharedTopPerformers.length > 0) {
                                scoreInfo += ` <span class="text-xs text-gray-500">(Catatan: Juga dicapai oleh <strong>${otherSharedTopPerformers.join(', ')}</strong> pada kriteria ini).</span>`;
                            }
                        }
                        scoreInfo += '</li>';
                        considerationDetailsHTML += scoreInfo;
                    });
                    considerationDetailsHTML += '</ul>';

                    const decisionContext = currentDecisionTitle ? ` untuk keputusan <strong class="text-blue-600">${currentDecisionTitle}</strong>` : "";
                    summarySectionContent.innerHTML = `
                        <h4 class="font-semibold text-lg mb-2 text-blue-600" style="font-family: 'Roboto Slab', serif;">Kesimpulan Analisis${decisionContext.replace(/<strong class="text-blue-600">/g, `<strong class="text-blue-600 font-bold">`)}:</h4>
                        <p class="text-sm text-gray-700">Berdasarkan perhitungan menggunakan metode Simple Additive Weighting (SAW), alternatif terbaik yang direkomendasikan adalah 
                           <strong class="font-bold text-green-600">${bestAlternative.alternativeName}</strong> 
                           dengan nilai preferensi tertinggi sebesar 
                           <strong class="font-bold text-green-600">${bestAlternative.sawScore.toFixed(4)}</strong>.
                        </p>
                        <p class="mt-2 text-xs text-gray-500">Alternatif ini mendapatkan peringkat pertama dan dianggap sebagai pilihan yang paling optimal berdasarkan kriteria dan bobot yang telah ditentukan.</p>
                        <hr class="my-3 border-blue-200">
                        <h5 class="font-semibold text-md mb-1 text-blue-600" style="font-family: 'Roboto Slab', serif;">Saran Pertimbangan untuk ${bestAlternative.alternativeName}:</h5>
                        ${considerationDetailsHTML}
                    `;
                } else {
                     summarySectionContent.innerHTML = '<p class="italic text-sm">Tidak ada kesimpulan karena tidak ada hasil peringkat.</p>';
                }
            }

            formKriteria.addEventListener('submit', function(event) {
                event.preventDefault();
                criteriaErrorDiv.textContent = '';
                const name = formKriteria.criterion_name.value.trim();
                const weight = parseFloat(criterionWeightInput.value);
                const type = formKriteria.criterion_type.value;

                if (!name) {
                    criteriaErrorDiv.textContent = 'Nama kriteria tidak boleh kosong.';
                    formKriteria.criterion_name.classList.add('input-error');
                    return;
                }
                formKriteria.criterion_name.classList.remove('input-error');

                if (isNaN(weight) || weight <= 0) { 
                    criteriaErrorDiv.textContent = 'Bobot harus angka positif.';
                    criterionWeightInput.classList.add('input-error');
                    return;
                }
                 if (weight < parseFloat(criterionWeightInput.min)) {
                    criteriaErrorDiv.textContent = `Bobot minimal adalah ${criterionWeightInput.min}.`;
                    criterionWeightInput.classList.add('input-error');
                    return;
                }

                const remainingBudget = parseFloat((totalWeightCap - currentAllocatedWeight).toFixed(10));
                if (weight > remainingBudget + 1e-9) { 
                    criteriaErrorDiv.textContent = `Bobot (${weight}) melebihi sisa budget (${remainingBudget.toFixed(2)}). Maks: ${parseFloat(criterionWeightInput.max).toFixed(2)}.`;
                    criterionWeightInput.classList.add('input-error');
                    return;
                }
                criterionWeightInput.classList.remove('input-error');

                if (criteria.find(c => c.name === name)) {
                    criteriaErrorDiv.textContent = `Kriteria '${name}' sudah ada.`;
                    return;
                }

                criteria.push({ name, weight, type });
                currentAllocatedWeight = parseFloat((currentAllocatedWeight + weight).toFixed(10)); 

                alternatives.forEach(alt => {
                    if (alt.scores[name] === undefined) {
                        alt.scores[name] = 0; 
                    }
                });

                renderCriteriaTable();
                formKriteria.reset(); 
                criterionWeightInput.value = ''; 
                updateWeightInputState(); 
                showToast(`Kriteria '${name}' berhasil ditambahkan.`);
            });

            formAlternatif.addEventListener('submit', function(event) {
                event.preventDefault();
                alternativesErrorDiv.textContent = '';
                const name = formAlternatif.alternative_name.value.trim();

                if (!name) {
                    alternativesErrorDiv.textContent = 'Nama alternatif tidak boleh kosong.';
                    formAlternatif.alternative_name.classList.add('input-error');
                    return;
                }
                formAlternatif.alternative_name.classList.remove('input-error');

                if (alternatives.find(alt => alt.name === name)) {
                    alternativesErrorDiv.textContent = `Alternatif '${name}' sudah ada.`;
                    return;
                }
                
                const newAlternative = { name, scores: {} };
                criteria.forEach(c => {
                    newAlternative.scores[c.name] = 0; 
                });

                alternatives.push(newAlternative);
                renderAlternativesList();
                formAlternatif.reset();
                showToast(`Alternatif '${name}' berhasil ditambahkan.`);
            });

            saveScoresButton.addEventListener('click', function() {
                matriksErrorDiv.textContent = '';
                saveScoresMessageDiv.textContent = '';
                let allScoresValid = true;

                document.querySelectorAll('.score-input').forEach(input => {
                    const altName = input.dataset.altName;
                    const critName = input.dataset.critName;
                    const value = parseFloat(input.value);

                    if (isNaN(value)) { 
                        matriksErrorDiv.textContent = `Nilai untuk ${altName} - ${critName} tidak valid. Harap isi semua skor dengan angka.`;
                        input.classList.add('input-error');
                        allScoresValid = false;
                        return; 
                    }
                    input.classList.remove('input-error');
                    
                    const alternative = alternatives.find(alt => alt.name === altName);
                    if (alternative) {
                        alternative.scores[critName] = value;
                    }
                });

                if (allScoresValid) {
                    saveScoresMessageDiv.textContent = 'Semua skor berhasil disimpan!';
                    showToast('Skor berhasil disimpan.');
                } else {
                    showToast('Gagal menyimpan skor, periksa input.', 'error');
                }
                updateWeightInputState(); 
            });
            
            hitungSawButton.addEventListener('click', function() {
                calculationErrorDiv.textContent = '';
                tabelHasilBody.innerHTML = '';
                summarySectionContent.innerHTML = '<p class="italic text-sm">Menghitung...</p>'; 

                if (criteria.length === 0) {
                    calculationErrorDiv.textContent = 'Tidak ada kriteria. Tambahkan kriteria terlebih dahulu.';
                    showToast('Tidak ada kriteria.', 'error');
                    summarySectionContent.innerHTML = '<p class="italic text-sm">Tidak dapat membuat kesimpulan, kriteria kosong.</p>';
                    return;
                }
                if (alternatives.length === 0) {
                    calculationErrorDiv.textContent = 'Tidak ada alternatif. Tambahkan alternatif terlebih dahulu.';
                    showToast('Tidak ada alternatif.', 'error');
                    summarySectionContent.innerHTML = '<p class="italic text-sm">Tidak dapat membuat kesimpulan, alternatif kosong.</p>';
                    return;
                }

                if (Math.abs(currentAllocatedWeight - totalWeightCap) > 1e-9) {
                    calculationErrorDiv.textContent = `Total bobot kriteria harus tepat ${totalWeightCap}. Saat ini total bobot adalah ${currentAllocatedWeight.toFixed(2)}.`;
                    showToast(`Total bobot kriteria harus tepat ${totalWeightCap}.`, 'error');
                    summarySectionContent.innerHTML = `<p class="italic text-sm">Tidak dapat membuat kesimpulan, total bobot kriteria tidak ${totalWeightCap}.</p>`;
                    return;
                }


                for (const alt of alternatives) {
                    for (const crit of criteria) {
                        if (alt.scores[crit.name] === undefined || alt.scores[crit.name] === '' || isNaN(parseFloat(alt.scores[crit.name]))) {
                            calculationErrorDiv.textContent = `Skor untuk ${alt.name} - ${crit.name} belum diisi atau tidak valid. Harap simpan semua skor terlebih dahulu.`;
                            showToast('Skor belum lengkap atau tidak valid.', 'error');
                            summarySectionContent.innerHTML = `<p class="italic text-sm">Tidak dapat membuat kesimpulan, skor untuk ${alt.name} - ${crit.name} tidak valid.</p>`;
                            return;
                        }
                    }
                }

                const totalEnteredWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
                if (totalEnteredWeight === 0) { 
                    calculationErrorDiv.textContent = 'Total bobot mentah kriteria yang diinput adalah nol. Tidak dapat melakukan normalisasi bobot.';
                    showToast('Total bobot mentah kriteria nol.', 'error');
                    summarySectionContent.innerHTML = '<p class="italic text-sm">Tidak dapat membuat kesimpulan, total bobot mentah kriteria nol.</p>';
                    return;
                }
                const normalizedWeights = {};
                criteria.forEach(c => {
                    normalizedWeights[c.name] = c.weight / totalEnteredWeight; 
                });

                const normalizedDecisionMatrix = alternatives.map(alt => ({
                    name: alt.name,
                    normalizedScores: {}
                }));

                criteria.forEach(crit => {
                    const critScores = alternatives.map(alt => alt.scores[crit.name]);
                    
                    if (crit.type === 'benefit') {
                        const maxVal = Math.max(...critScores);
                        if (maxVal === 0) { 
                             alternatives.forEach((alt, index) => {
                                normalizedDecisionMatrix[index].normalizedScores[crit.name] = 0; 
                            });
                        } else {
                            alternatives.forEach((alt, index) => {
                                normalizedDecisionMatrix[index].normalizedScores[crit.name] = alt.scores[crit.name] / maxVal;
                            });
                        }
                    } else { 
                        const minVal = Math.min(...critScores);
                        alternatives.forEach((alt, index) => {
                            if (alt.scores[crit.name] === 0) { 
                                normalizedDecisionMatrix[index].normalizedScores[crit.name] = 1;
                            } else if (minVal === 0 && alt.scores[crit.name] !==0) { 
                                normalizedDecisionMatrix[index].normalizedScores[crit.name] = 0;
                            } else if (minVal === 0 && alt.scores[crit.name] === 0) { 
                                normalizedDecisionMatrix[index].normalizedScores[crit.name] = 1; 
                            }
                            else { 
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
                sawResults.forEach((res, index) => {
                    res.rank = index + 1;
                });

                renderResultsTable(sawResults); 
                showToast('Perhitungan SAW berhasil!');
            });

            resetAllButton.addEventListener('click', function() {
                if (confirm("Apakah Anda yakin ingin mereset semua data? Data yang belum disimpan akan hilang.")) {
                    window.location.reload();
                }
            });

            updateWeightInputState(); 
            renderCriteriaTable(); 
            renderAlternativesList(); 
        });