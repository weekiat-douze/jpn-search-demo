

export default interface Word {
    word_id: number;
    word_type: string;
    word_position: number;
    surface_form: string;
    reading: string;
    pronunciation: string;
    pos_detail_1: string;
    pos_detail_2: string;
    pos_detail_3: string;
    pos: string; // pos is "Parts of Speech"
    conjugated_type: string;
    conjugated_form: string;
    basic_form: string;
}
