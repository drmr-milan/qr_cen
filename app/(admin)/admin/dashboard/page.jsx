import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Work_hours_form, About_form, Social_m_form } from "./Forms";

export default function Dashboard() {
	const predplata = 2;

	return (
		<main className="flex-grow py-8">
			<p className="text-center text-xl font-semibold mb-6">Name of local</p>

			<p className="italic opacity-70">** dodati dugme za link lokala</p>
			<p className="italic opacity-70">** radno vreme on/off i po danima</p>

			<section className="grid grid-cols-2 md:grid-cols-4">
				<article className="flex flex-col gap-4 text-center px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="text-center font-semibold mb-2">Info</p>

					<div className="flex justify-center items-center">
						<p>Aktivan paket: Besplatan</p>

						{predplata !== 3 && <p className="ml-8">Unapredi paket</p>}
					</div>

					<p>Ističe za: 362 dana (12.09.2023.)</p>

					{predplata !== 3 && <p className="italic">Saznaj vise od boljim paketima</p>}
				</article>

				<article className="flex flex-col gap-4 px-4 pt-4 pb-6 m-4 rounded-md text-center col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-2">Pregledi ____</p>

					<div className="flex gap-4 items-center justify-center">
						<p>09.2023.</p>

						<p>___</p>

						<p>+- ___ (___%)</p>

						<p>Icon up/down</p>
					</div>

					<div className="flex gap-4 items-center justify-center">
						<p>08.2023.</p>

						<p>___</p>

						<p>+- ___ (___%)</p>

						<p>Icon up/down</p>
					</div>

					<div className="flex gap-4 items-center justify-center">
						<p>07.2023.</p>

						<p>___</p>

						<p>+- ___ (___%)</p>

						<p>Icon up/down</p>
					</div>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Karta pica</p>

					<div className="flex flex-wrap justify-evenly">
						<div className="flex items-center mb-4">
							<p>Katergorija: ___</p>

							<Link href="#">
								<IconPencil
									stroke={1}
									size={46}
									className="p-2"
								/>
							</Link>
						</div>

						<div className="flex items-center mb-4">
							<p>Artikala: ___</p>

							<Link href="#">
								<IconPencil
									stroke={1}
									size={46}
									className="p-2"
								/>
							</Link>
						</div>
					</div>

					<div className="flex gap-2 justify-center">
						<p className="mb-2">Način prikazivanja:</p>

						<RadioGroup defaultValue="option-one">
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="option-one"
									id="option-one"
								/>
								<Label
									htmlFor="option-one"
									className="font-normal text-base"
								>
									Samo tekst
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="option-two"
									id="option-two"
								/>
								<Label
									htmlFor="option-two"
									className="font-normal text-base"
								>
									Sa slikama
								</Label>
							</div>
						</RadioGroup>
					</div>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Meni</p>

					<div className="flex flex-wrap justify-evenly">
						<div className="flex items-center mb-4">
							<p>Katergorija: ___</p>

							<Link href="#">
								<IconPencil
									stroke={1}
									size={46}
									className="p-2"
								/>
							</Link>
						</div>

						<div className="flex items-center mb-4">
							<p>Artikala: ___</p>

							<Link href="#">
								<IconPencil
									stroke={1}
									size={46}
									className="p-2"
								/>
							</Link>
						</div>
					</div>

					<div className="flex gap-2 justify-center">
						<p className="mb-2">Način prikazivanja:</p>

						<RadioGroup defaultValue="option-one">
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="option-one"
									id="option-one"
								/>
								<Label
									htmlFor="option-one"
									className="font-normal text-base"
								>
									Samo tekst
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="option-two"
									id="option-two"
								/>
								<Label
									htmlFor="option-two"
									className="font-normal text-base"
								>
									Sa slikama
								</Label>
							</div>
						</RadioGroup>
					</div>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-1 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Promocije</p>
				</article>

				<article className="px-4 pt-4 pb-6 m-4 rounded-md col-span-1 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Dešavanja</p>
				</article>

				<article className="flex flex-col gap-2 px-4 pt-4 pb-6 m-4 rounded-md col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Vise informacija</p>

					<Work_hours_form day_of_week="Ponedeljak" />

					<About_form value={null} />
				</article>

				<article className="flex flex-col gap-2 px-4 pt-4 pb-6 m-4 rounded-md text-center col-span-2 border-[1px] border-gray-900">
					<p className="font-semibold mb-6 text-center">Linkovi</p>

					<Social_m_form
						form_name="Instagram"
						type="url"
						value={null}
					/>

					<Social_m_form
						form_name="Facebook"
						type="url"
						value={null}
					/>

					<Social_m_form
						form_name="Booking"
						type="url"
						value={null}
					/>

					<Social_m_form
						form_name="Website"
						type="url"
						value={null}
					/>

					<Social_m_form
						form_name="Email"
						type="email"
						value={null}
					/>

					<Social_m_form
						form_name="Phone"
						type="tel"
						value={null}
					/>
				</article>
			</section>
		</main>
	);
}
